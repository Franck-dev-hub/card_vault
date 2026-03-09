#!/bin/bash

for i in {1..10}; do
  echo "Request $i"
  curl -s -o /dev/null -D - https://card-vault.fr/api/login
done
