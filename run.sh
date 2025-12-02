#!/bin/bash

# Colors for the beauty
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}=== Docker Launch Script ===${NC}\n"

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
    echo -e "${YELLOW}Supported distros: debian, arch, macOS${NC}"
    exit 1
  fi

elif [[ "$(uname)" == "Darwin" ]]; then
  OS="macos"
  echo -e "${GREEN}OS: macOS${NC}"

else
  echo -e "${RED}OS not supported. Please use Linux or macOS.${NC}"
  exit 1
fi

echo -e "${GREEN}Detected OS: $OS${NC}\n"

# Check if docker is installed
if command -v docker &> /dev/null; then
  echo -e "${GREEN}Docker already installed${NC}\n"
else
  echo -e "${YELLOW}Docker is not installed${NC}\n"

  if [ "$OS" = "debian" ]; then
    echo -e "${YELLOW}Installing Docker on Debian...${NC}\n"
    sudo apt update
    sudo apt install -y docker.io docker-compose

  elif [ "$OS" = "arch" ]; then
    echo -e "${YELLOW}Installing Docker on Arch...${NC}\n"
    sudo pacman -Sy --noconfirm docker docker-compose

  elif [ "$OS" = "macos" ]; then
    echo -e "${YELLOW}Installing Docker on macOS...${NC}\n"
    brew install --cask docker
  fi
fi

echo ""

# Check docker version
if command -v docker &> /dev/null; then
    echo -e "${GREEN}Docker is installed${NC}"
    docker --version
else
    echo -e "${RED}Docker is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}Starting docker-compose...${NC}\n"

if [ "$OS" = "macos" ]; then
  docker compose up -d
else
  docker-compose up -d
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Success! Containers are running${NC}"
    echo -e "${GREEN}Launch this command to stop docker :${NC}"
    if [ "$OS" = "macos" ]; then
      echo -e "${YELLOW}docker compose down${NC}"
    else
      echo -e "${YELLOW}docker-compose down${NC}"
    fi
else
    echo -e "${RED}Error starting docker compose${NC}"
    exit 1
fi
