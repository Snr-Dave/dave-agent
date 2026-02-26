# Dave-Agent

An AI chat interface built with Next.js 15, React 19, and Tailwind CSS 4. It uses OpenAI's GPT-3.5-turbo API to power conversations with "Dave-Agent".

## Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Runtime**: Node.js 20

## Project Structure

```
src/
  app/
    api/
      chat/
        route.ts    # API route that proxies to OpenAI
    globals.css     # Global styles
    layout.tsx      # Root layout
    page.tsx        # Main chat UI
public/             # Static assets
```

## Key Files

- `src/app/page.tsx` - Chat UI component
- `src/app/api/chat/route.ts` - OpenAI API proxy route
- `next.config.ts` - Next.js config with `allowedDevOrigins: ["*"]` for Replit proxy support

## Environment Variables

- `GEMINI_API_KEY` - Required. Your Google Gemini API key.

## Development

The dev server runs on `0.0.0.0:5000` via:
```
npm run dev
```

## Deployment

Configured for autoscale deployment with:
- Build: `npm run build`
- Run: `npm run start`
