# Agent Sumo Chatbot

A modern chatbot UI built with Next.js 14 App Router and Tailwind CSS that connects to the Agent Sumo Python API for business operations.

## Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Chat**: Interactive chat interface with message history
- **AI Integration**: Connects to Python Agent Sumo API for business operations
- **Function Calling Display**: Shows which functions were called and their parameters
- **Loading States**: Smooth loading animations and error handling
- **Mobile Responsive**: Works perfectly on all device sizes

## Project Structure

```
agent-sumo-chatbot/
├── app/
│   ├── api/chat/route.ts    # API route for forwarding messages
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ChatWidget.tsx       # Main chat interface component
│   └── icons.tsx            # Custom icon components
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

## Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:3000`

## Prerequisites

Before running the chatbot, ensure you have:

1. **Python Agent Sumo API** running on `http://localhost:8000`
2. **Go Sumo Core API** running on `http://localhost:3002`

## Usage

### Starting the Services

1. **Start the Python Agent API**:

   ```bash
   cd ../agent-sumo
   python main.py
   ```

2. **Start the Go Core API**:

   ```bash
   cd ../sumo-core
   go run main.go
   ```

3. **Start the Next.js Chatbot**:
   ```bash
   npm run dev
   ```

### Using the Chatbot

1. Open your browser to `http://localhost:3000`
2. Type your message in the input box
3. Press Enter or click the send button
4. The chatbot will:
   - Send your message to the Python Agent API
   - Display the AI response
   - Show which functions were called (if any)
   - Display the parameters used

### Example Conversations

**Create a Purchase Order**:

```
User: "Create a purchase order for 10kg chicken from Vendor A for tomorrow"
Bot: "I've successfully created a purchase order for 10kg of chicken from Vendor A, scheduled for delivery tomorrow. The order has been processed and assigned order ID PO-2024-001."
```

**Add Inventory Item**:

```
User: "Add tomatoes to inventory, category vegetables, price $2.50 per kg"
Bot: "I've added tomatoes to the inventory under the vegetables category with a unit price of $2.50 per kg."
```

**Check Inventory**:

```
User: "What's the current inventory status for rice and tomatoes?"
Bot: "Here's the current inventory status for the requested items..."
```

## API Integration

The chatbot forwards messages to the Python Agent API at `http://localhost:8000/chat`, which:

1. Uses OpenAI function calling to understand the intent
2. Calls the appropriate Go Core API endpoints
3. Returns natural language responses

### API Flow

```
User Input → Next.js API Route → Python Agent API → Go Core API → Response
```

## Customization

### Styling

The UI uses Tailwind CSS with a custom color scheme. You can modify:

- **Colors**: Edit `tailwind.config.js` to change the primary color scheme
- **Layout**: Modify `components/ChatWidget.tsx` for different layouts
- **Icons**: Replace icons in `components/icons.tsx`

### API Configuration

To change the API endpoints:

1. **Python Agent API**: Update the URL in `app/api/chat/route.ts`
2. **Go Core API**: The Python agent handles this configuration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Troubleshooting

### Common Issues

1. **API Connection Errors**:

   - Ensure both Python and Go APIs are running
   - Check that ports 8000 and 3002 are available
   - Verify network connectivity

2. **Build Errors**:

   - Run `npm install` to ensure all dependencies are installed
   - Clear `.next` folder and rebuild

3. **TypeScript Errors**:
   - Run `npm run lint` to check for issues
   - Ensure all imports are correct

### Debug Mode

Enable debug logging by adding to `app/api/chat/route.ts`:

```typescript
console.log("Request body:", body);
console.log("Agent response:", agentResponse);
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.
