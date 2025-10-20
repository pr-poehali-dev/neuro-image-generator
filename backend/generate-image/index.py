import json
import os
import requests
import time
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate AI images using Replicate API
    Args: event with httpMethod (POST for generation, OPTIONS for CORS), body with prompt
    Returns: HTTP response with generated image URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    api_token = os.environ.get('REPLICATE_API_TOKEN')
    if not api_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'REPLICATE_API_TOKEN not configured'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    prompt = body_data.get('prompt', '')
    
    if not prompt:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Prompt is required'}),
            'isBase64Encoded': False
        }
    
    headers = {
        'Authorization': f'Bearer {api_token}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'version': 'black-forest-labs/flux-schnell:bf0d425e5b63c25c9b23c2c6ee8ca154c9c31c0fbc4e9a39bfed2b6c1b41',
        'prompt': prompt,
        'aspect_ratio': '1:1',
        'output_format': 'jpg',
        'output_quality': 90
    }
    
    response = requests.post(
        'https://api.replicate.com/v1/predictions',
        headers=headers,
        json={'input': payload},
        timeout=10
    )
    
    if response.status_code != 201:
        return {
            'statusCode': response.status_code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Replicate API error: {response.text}'}),
            'isBase64Encoded': False
        }
    
    prediction = response.json()
    prediction_id = prediction.get('id')
    
    max_attempts = 30
    for _ in range(max_attempts):
        time.sleep(2)
        
        status_response = requests.get(
            f'https://api.replicate.com/v1/predictions/{prediction_id}',
            headers=headers,
            timeout=10
        )
        
        if status_response.status_code != 200:
            continue
            
        status_data = status_response.json()
        status = status_data.get('status')
        
        if status == 'succeeded':
            output = status_data.get('output')
            image_url = output[0] if isinstance(output, list) and output else output
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'image_url': image_url,
                    'prompt': prompt
                }),
                'isBase64Encoded': False
            }
        
        if status == 'failed':
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Image generation failed'}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 408,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Generation timeout'}),
        'isBase64Encoded': False
    }