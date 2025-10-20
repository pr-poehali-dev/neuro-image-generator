import json
import os
import requests
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate AI images using fal.ai API
    Args: event with httpMethod, body containing prompt
          context with request_id attribute
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
    
    body_str = event.get('body', '{}')
    if not body_str or body_str == '':
        body_str = '{}'
    body_data = json.loads(body_str)
    prompt: str = body_data.get('prompt', '')
    
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
    
    fal_api_key = os.environ.get('FAL_API_KEY')
    if not fal_api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'FAL_API_KEY not configured'}),
            'isBase64Encoded': False
        }
    
    response = requests.post(
        'https://fal.run/fal-ai/flux/schnell',
        headers={
            'Authorization': f'Key {fal_api_key}',
            'Content-Type': 'application/json'
        },
        json={
            'prompt': prompt,
            'image_size': 'square',
            'num_inference_steps': 4,
            'num_images': 1
        },
        timeout=60
    )
    
    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Image generation failed'}),
            'isBase64Encoded': False
        }
    
    result = response.json()
    image_url = result.get('images', [{}])[0].get('url', '')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'imageUrl': image_url}),
        'isBase64Encoded': False
    }