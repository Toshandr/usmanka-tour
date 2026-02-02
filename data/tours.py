#!/usr/bin/env python3
# Скрипт для генерации страниц туров на основе шаблона
# Запустите: python create_tours.py

import os

# Данные для каждого тура из ТЗ
from source.data import tours_data

# Экспортируем tours_data для использования в main.py
__all__ = ['tours_data']

# Функция для чтения шаблона
def read_template():
    with open('dance.html', 'r', encoding='utf-8') as f:
        return f.read()

# Функция для генерации HTML страницы тура
def generate_tour_page(tour_key, tour_data):
    template = read_template()
    
    # Замена основных данных
    replacements = {
        'Танцевальный девичник': tour_data['title'],
        'dance': tour_key,
        'dance.html': tour_key + '.html',
        'Танцевальный девичник на <span class="gradient-text">Усманке</span>': tour_data['title'] + ' <span class="gradient-text">Усманка</span>',
        'Изучение хореографии с известным преподавателем, красивые видеосъёмки, йога, винная дегустация и сплав на байдарках': tour_data['description'],
        'https://via.placeholder.com/1200x600/4CAF50/FFFFFF?text=Танцевальный+девичник+на+Усманке': tour_data['image']
    }
    
    for old, new in replacements.items():
        template = template.replace(old, new)
    
    return template

if __name__ == '__main__':
    # Генерируем страницу для английской Усманки как пример
    content = generate_tour_page('english', tours_data['english'])
    with open('english.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Создана страница english.html')

