import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const promptCategories = [
    { id: 'all', name: 'Все', icon: 'Sparkles' },
    { id: 'portrait', name: 'Портреты', icon: 'User' },
    { id: 'landscape', name: 'Пейзажи', icon: 'Mountain' },
    { id: 'abstract', name: 'Абстракция', icon: 'Palette' },
    { id: 'anime', name: 'Аниме', icon: 'Sparkle' }
  ];

  const imagePrompts = [
    { id: 1, title: 'Киберпанк портрет', category: 'portrait', prompt: 'Cyberpunk portrait, neon lights, futuristic city background, high detail' },
    { id: 2, title: 'Космический пейзаж', category: 'landscape', prompt: 'Alien planet landscape, purple sky, twin moons, bioluminescent plants' },
    { id: 3, title: 'Абстрактные формы', category: 'abstract', prompt: 'Abstract geometric shapes, vibrant gradients, flowing patterns' },
    { id: 4, title: 'Аниме персонаж', category: 'anime', prompt: 'Anime character, magical girl style, dynamic pose, detailed eyes' },
    { id: 5, title: 'Горный закат', category: 'landscape', prompt: 'Mountain sunset, dramatic clouds, golden hour lighting, photorealistic' },
    { id: 6, title: 'Неоновая абстракция', category: 'abstract', prompt: 'Neon abstract waves, electric blue and pink, 3D effect' }
  ];

  const videoTemplates = [
    { id: 1, title: 'Морфинг объектов', duration: '5 сек', description: 'Плавный переход между формами' },
    { id: 2, title: 'Движение камеры', duration: '10 сек', description: 'Кинематографическое движение' },
    { id: 3, title: 'Частицы и эффекты', duration: '7 сек', description: 'Абстрактные частицы' },
    { id: 4, title: 'Текстовая анимация', duration: '8 сек', description: 'Динамичный текст' }
  ];

  const pricingPlans = [
    {
      name: 'Старт',
      price: '0',
      period: 'навсегда',
      features: ['10 изображений/месяц', '2 видео/месяц', 'Базовые шаблоны', 'Стандартное качество'],
      accent: false
    },
    {
      name: 'Про',
      price: '990',
      period: 'в месяц',
      features: ['Безлимит изображений', '50 видео/месяц', 'Все шаблоны', 'HD качество', 'Приоритетная генерация', 'API доступ'],
      accent: true
    },
    {
      name: 'Бизнес',
      price: '4990',
      period: 'в месяц',
      features: ['Всё из Про', 'Безлимит видео', '4K качество', 'Коммерческая лицензия', 'Персональная поддержка', 'Кастомные модели'],
      accent: false
    }
  ];

  const faqs = [
    { q: 'Как работает генерация изображений?', a: 'Мы используем передовые нейросети для создания уникальных изображений по вашему описанию. Просто опишите, что хотите увидеть, и AI создаст это за секунды.' },
    { q: 'Могу ли я использовать изображения коммерчески?', a: 'Да, на тарифах Про и Бизнес вы получаете полные права на коммерческое использование всех созданных материалов.' },
    { q: 'Как долго генерируется видео?', a: 'Генерация видео занимает от 30 секунд до 3 минут в зависимости от сложности и длительности ролика.' },
    { q: 'Можно ли отредактировать результат?', a: 'Да, вы можете изменить промпт и пересоздать изображение или использовать наши инструменты для тонкой настройки.' }
  ];

  const galleryImages = [
    { id: 1, title: 'Неоновый город', category: 'Киберпанк', image: 'https://cdn.poehali.dev/projects/377cf652-1cb3-4bf2-913d-3b61de4c4192/files/985682a0-ab18-40ff-9300-7d6f6790cefc.jpg' },
    { id: 2, title: 'Космическая станция', category: 'Sci-Fi', image: 'https://cdn.poehali.dev/projects/377cf652-1cb3-4bf2-913d-3b61de4c4192/files/985682a0-ab18-40ff-9300-7d6f6790cefc.jpg' },
    { id: 3, title: 'Волшебный лес', category: 'Фэнтези', image: 'https://cdn.poehali.dev/projects/377cf652-1cb3-4bf2-913d-3b61de4c4192/files/1a365414-750a-4ac6-a964-e8290a43891e.jpg' },
    { id: 4, title: 'Абстрактное искусство', category: 'Абстракция', image: 'https://cdn.poehali.dev/projects/377cf652-1cb3-4bf2-913d-3b61de4c4192/files/e2e16d15-a714-4842-baf8-2099e3db2e91.jpg' },
    { id: 5, title: 'Портрет будущего', category: 'Портрет', image: 'https://cdn.poehali.dev/projects/377cf652-1cb3-4bf2-913d-3b61de4c4192/files/985682a0-ab18-40ff-9300-7d6f6790cefc.jpg' },
    { id: 6, title: 'Горный пейзаж', category: 'Природа', image: 'https://cdn.poehali.dev/projects/377cf652-1cb3-4bf2-913d-3b61de4c4192/files/1a365414-750a-4ac6-a964-e8290a43891e.jpg' }
  ];

  const filteredPrompts = selectedCategory === 'all' 
    ? imagePrompts 
    : imagePrompts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Sparkles" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              NeuralStudio
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#generator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Генератор</a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Галерея</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Тарифы</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="#contacts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Контакты</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Попробовать
          </Button>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/40">✨ Новая эра AI-генерации</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Создавайте{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                потрясающий контент
              </span>{' '}
              с помощью AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Генерируйте уникальные изображения и видео за секунды. Библиотека готовых промптов и шаблонов для мгновенного старта.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Начать создавать
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary/40 hover:bg-primary/10">
                <Icon name="Play" className="mr-2" size={20} />
                Посмотреть примеры
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Генераторы</h2>
              <p className="text-xl text-muted-foreground">Выберите тип контента и начните создавать</p>
            </div>

            <Tabs defaultValue="images" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="images" className="text-base">
                  <Icon name="Image" className="mr-2" size={18} />
                  Изображения
                </TabsTrigger>
                <TabsTrigger value="videos" className="text-base">
                  <Icon name="Video" className="mr-2" size={18} />
                  Видео
                </TabsTrigger>
              </TabsList>

              <TabsContent value="images" className="space-y-6 animate-fade-in">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Библиотека промптов</CardTitle>
                    <CardDescription>Выберите готовый промпт или создайте свой</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {promptCategories.map(cat => (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={selectedCategory === cat.id ? 'bg-primary' : ''}
                        >
                          <Icon name={cat.icon as any} className="mr-2" size={16} />
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {filteredPrompts.map(prompt => (
                        <Card key={prompt.id} className="hover:border-primary/40 transition-all cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-base mb-1">{prompt.title}</CardTitle>
                                <CardDescription className="text-sm">{prompt.prompt}</CardDescription>
                              </div>
                              <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icon name="Wand2" size={16} />
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6 animate-fade-in">
                <Card className="border-secondary/20">
                  <CardHeader>
                    <CardTitle>Шаблоны видео</CardTitle>
                    <CardDescription>Готовые шаблоны для быстрой генерации</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {videoTemplates.map(template => (
                        <Card key={template.id} className="hover:border-secondary/40 transition-all cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <CardTitle className="text-base">{template.title}</CardTitle>
                                  <Badge variant="outline" className="text-xs">{template.duration}</Badge>
                                </div>
                                <CardDescription>{template.description}</CardDescription>
                              </div>
                              <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-secondary to-accent">
                                <Icon name="Play" size={16} />
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея работ</h2>
              <p className="text-xl text-muted-foreground">Созданные нашим сообществом</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {galleryImages.map(img => (
                <Card key={img.id} className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
                    <img 
                      src={img.image} 
                      alt={img.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{img.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">{img.category}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифы и цены</h2>
              <p className="text-xl text-muted-foreground">Выберите подходящий план</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map(plan => (
                <Card key={plan.name} className={`relative ${plan.accent ? 'border-primary shadow-lg shadow-primary/20 scale-105' : ''}`}>
                  {plan.accent && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-gradient-to-r from-primary to-secondary">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">₽ {plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.accent ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}
                      variant={plan.accent ? 'default' : 'outline'}
                    >
                      {plan.price === '0' ? 'Начать бесплатно' : 'Выбрать план'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Вопросы и ответы</h2>
              <p className="text-xl text-muted-foreground">Всё что нужно знать</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left text-lg">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Есть вопросы? Мы всегда рады помочь!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Mail" size={20} />
                support@neuralstudio.ai
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="MessageCircle" size={20} />
                Telegram
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Send" size={20} />
                Discord
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                    <Icon name="Sparkles" className="text-white" size={18} />
                  </div>
                  <span className="text-xl font-bold">NeuralStudio</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-платформа для создания визуального контента
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Продукт</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#generator" className="hover:text-foreground transition-colors">Генератор</a></li>
                  <li><a href="#gallery" className="hover:text-foreground transition-colors">Галерея</a></li>
                  <li><a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Поддержка</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                  <li><a href="#contacts" className="hover:text-foreground transition-colors">Контакты</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Документация</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Компания</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Блог</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Карьера</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 NeuralStudio. Все права защищены.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Github" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}