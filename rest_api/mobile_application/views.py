from flask import Blueprint, jsonify

import pygame
from pygame.locals import *
import sys, os
import time

mobile_application = Blueprint('mobile_application', __name__)


@mobile_application.route('/')
def index():
    return jsonify({"greeting": "Hello, World!"})


pygame.init()
mouse = pygame.mouse
fpsClock = pygame.time.Clock()
width = 1200
height = 600

window = pygame.display.set_mode((width, height))
canvas = window.copy()

#                     R    G    B
BLACK = pygame.Color( 0 ,  0 ,  0 )
WHITE = pygame.Color(255, 255, 255)

while True:
  for event in pygame.event.get():
    if event.type == QUIT:
      pygame.quit()
      sys.exit()
  window.fill(WHITE)
  pygame.display.update()