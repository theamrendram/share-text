# Share Text - Peer to Peer Text Sharing

A modern, minimalist web application for sharing text snippets with unique URLs. Built with Next.js, TypeScript, and MongoDB.

## 🌟 Features

- **Simple Text Sharing**: Share any text content with a single click
- **Unique URLs**: Each shared text gets a unique 6-character alphanumeric ID

## 🚀 Live Demo

Visit the application: [Share Text](https://sharetext.amrendram.me/)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Glassmorphism effects
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **UI Components**: Radix UI, Lucide React icons
- **HTTP Client**: Axios
- **Development**: ESLint, Prettier

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/theamrendram/share-text.git
   cd share-text
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── post/
│   │       ├── route.ts          # POST endpoint for creating text shares
│   │       └── [id]/
│   │           └── route.ts      # GET endpoint for retrieving text shares
│   ├── c/
│   │   └── [id]/
│   │       └── page.tsx          # Text viewing page
│   ├── layout.tsx                # Root layout with navbar and footer
│   └── page.tsx                  # Home page with text form
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── navbar.tsx               # Navigation component
│   ├── footer.tsx               # Footer component
│   ├── text-form.tsx            # Text input form
│   └── show-id.tsx              # Display shared text ID
├── lib/
│   ├── dbConnect.ts             # MongoDB connection utility
│   ├── generateAlphanumeric.ts  # ID generation utility
│   └── utils.ts                 # General utilities
└── schemas/
    └── text.modal.ts            # MongoDB schema definition
```

## 🔧 API Endpoints

### POST `/api/post`

Creates a new text share.

**Request Body:**

```json
{
  "text": "Your text content here"
}
```

**Response:**

```json
{
  "message": "Text saved successfully",
  "id": "abc123",
  "url": "https://sharetext.amrendram.me/c/abc123"
}
```

### GET `/api/post/[id]`

Retrieves a text share by ID.

**Response:**

```json
{
  "text": "Your shared text content",
  "id": "abc123",
  "accessCount": 5,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 Customization

### Styling

The application uses Tailwind CSS with custom glassmorphism effects. You can customize the appearance by modifying:

- `src/app/globals.css` - Global styles
- Component-specific classes in each component file
- Color schemes and gradients in the main page

### Database Schema

Modify `src/schemas/text.modal.ts` to add new fields or change the data structure.

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting:
   ```bash
   npm run lint
   npm run build
   ```
5. Commit your changes: `git commit -m 'Add: your feature description'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a Pull Request

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing code formatting (Prettier + ESLint)
- Write meaningful commit messages
- Add comments for complex logic
- Use descriptive variable and function names

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused and small

### Feature Requests

- Use GitHub Issues to suggest new features
- Provide detailed descriptions of the desired functionality
- Include use cases and examples

### Bug Reports

- Use GitHub Issues to report bugs
- Include steps to reproduce the issue
- Provide browser/device information
- Include error messages and console logs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/theamrendram/share-text/issues)

---

Made with ❤️ by Kumar Amrendram
