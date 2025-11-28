#!/bin/bash

# Colors for the beauty
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== Docker Launch Script ===${NC}"

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  if grep -qi "debian" /etc/os-release; then
    OS="debian"
    echo -e "${GREEN}OS: Debian${NC}"
  elif grep -qi "arch" /etc/os-release; then
    OS="arch"
    echo -e "${GREEN}OS: Arch${NC}"
  else
    OS="linux"
    echo -e "${YELLOW}OS: Other Linux${NC}"
    echo -e "${RED}OS not supported${NC}"
    echo -e "${YELLOW}Supported distros: debian, arch${NC}"
    exit 1
  fi
else
    echo -e "${RED}OS not supported. Please use Linux.${NC}"
    exit 1
fi

# Check if docker is installed
if command -v docker &> /dev/null; then
  echo -e "${GREEN}Docker already installed${NC}"
else
  echo -e "${YELLOW}Docker is not installed${NC}"
  if [ "$OS" = "debian" ]; then
    echo -e "${YELLOW}Installing Docker on Debian...${NC}"
    sudo apt update
    sudo apt install -y docker.io docker-compose
  elif [ "$OS" = "arch" ]; then
    echo -e "${YELLOW}Installing Docker on Arch...${NC}"
    sudo pacman -Sy --noconfirm docker docker-compose
  fi
fi

# Check docker version
if command -v docker &> /dev/null; then
    docker --version
else
    echo -e "${RED}Docker is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}Starting docker-compose...${NC}"
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Success! Containers are running${NC}"
    echo -e "${GREEN}Launch ${YELLOW}docker-compose down${GREEN} to stop docker${NC}"
    docker ps
else
    echo -e "${RED}Error starting docker-compose${NC}"
    docker-compose down
    exit 1
fi
