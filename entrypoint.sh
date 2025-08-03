#!/bin/sh

# Fail on any error
set -e

echo "🔧 Installing dependencies with pnpm..."
pnpm install

echo "🚀 Starting NestJS app..."
exec pnpm start:dev
