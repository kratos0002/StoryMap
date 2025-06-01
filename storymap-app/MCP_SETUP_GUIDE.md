# 🚀 Supabase MCP Integration Setup Guide for StoryMap

This guide will help you set up Model Context Protocol (MCP) integration between Cursor IDE and your Supabase database, giving Cursor direct access to your StoryMap database for real-time queries, analysis, and development assistance.

## 📋 **Prerequisites**

- ✅ Cursor IDE installed
- ✅ StoryMap project with Supabase database
- ✅ Node.js and npm installed
- ✅ Supabase credentials configured in `.env`

## 🔧 **Step 1: Verify Dependencies**

The required dependencies should already be installed:

```bash
# Check if MCP SDK is installed
npm list @modelcontextprotocol/sdk

# If not installed, run:
npm install @modelcontextprotocol/sdk --legacy-peer-deps
```

## 🗂️ **Step 2: Verify File Structure**

Your project should now have these MCP-related files:

```
storymap-app/
├── mcp-server/
│   └── supabase-server.js          # Custom MCP server
├── lib/
│   └── supabase-mcp-client.js      # Enhanced Supabase client
├── scripts/
│   └── test-mcp-server.js          # Test script
├── .cursor/
│   └── mcp-config.json             # Cursor MCP configuration
├── .vscode/
│   └── settings.json               # VSCode/Cursor settings
└── MCP_SETUP_GUIDE.md              # This guide
```

## 🔑 **Step 3: Configure Environment Variables**

Ensure your `.env` file has the required Supabase credentials:

```bash
# Required for MCP integration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: HyperBrowser (if using story collection)
HYPERBROWSER_API_KEY=your_hyperbrowser_key_here
```

**Important:** The MCP server will use `SUPABASE_SERVICE_ROLE_KEY` if available, falling back to `SUPABASE_ANON_KEY`. The service role key provides full database access.

## 🧪 **Step 4: Test the MCP Server**

Before configuring Cursor, test that the MCP server works:

```bash
# Test database connection and MCP functionality
node scripts/test-mcp-server.js
```

Expected output:
```
🧪 Testing StoryMap Supabase MCP Server
==================================================
🔗 Testing Supabase connection...
✅ Supabase connection successful

📊 Getting database statistics...
📈 Database Statistics:
   Stories: 4
   Authors: 4
   Locations: 4
   Themes: 8

📚 Getting sample stories...
✅ Found 3 sample stories:
   1. "The Gift of the Magi" (2065 words)
      by O. Henry
   2. "The Yellow Wallpaper" (6085 words)
      by Charlotte Perkins Gilman

🎉 MCP Server test completed successfully!
```

## ⚙️ **Step 5: Configure Cursor for MCP**

### Option A: Automatic Configuration (Recommended)

The configuration files are already created. Restart Cursor to load the MCP server.

### Option B: Manual Configuration

If automatic configuration doesn't work, manually add to Cursor settings:

1. Open Cursor
2. Press `Cmd/Ctrl + ,` to open Settings
3. Click "Open Settings (JSON)" in the top right
4. Add this configuration:

```json
{
  "mcp.servers": {
    "storymap-supabase": {
      "command": "node",
      "args": ["mcp-server/supabase-server.js"],
      "env": {
        "SUPABASE_URL": "${env:SUPABASE_URL}",
        "SUPABASE_SERVICE_ROLE_KEY": "${env:SUPABASE_SERVICE_ROLE_KEY}",
        "SUPABASE_ANON_KEY": "${env:SUPABASE_ANON_KEY}"
      }
    }
  }
}
```

## 🚀 **Step 6: Start Using MCP with Cursor**

### Test the Integration

1. **Restart Cursor** to load the MCP configuration
2. **Open your StoryMap project** in Cursor
3. **Start a new chat** with Cursor
4. **Test with these commands:**

```
"Show me the database schema"
"How many stories are in the database?"
"List all stories with their authors"
"Get database statistics"
```

### Example Conversations

Here are some powerful ways to use MCP with Cursor:

#### 📊 **Database Analysis**
```
You: "Analyze my StoryMap database and give me insights"

Cursor will:
- Get database statistics
- Show story distribution by location
- Analyze word counts and reading times
- Identify popular themes and authors
```

#### 🔍 **Data Exploration**
```
You: "Find all stories set in Paris"
You: "Show me stories by Edgar Allan Poe"
You: "What are the most popular themes?"
You: "List stories published before 1900"
```

#### 🛠️ **Development Assistance**
```
You: "Help me optimize this database query"
You: "Suggest improvements to my database schema"
You: "Write a function to search stories by multiple criteria"
```

#### 📝 **Content Management**
```
You: "Insert a test story into the database"
You: "Show me stories that need better summaries"
You: "Find duplicate authors in the database"
```

## 🔧 **Available MCP Tools**

The MCP server provides these tools to Cursor:

| Tool | Description |
|------|-------------|
| `get_database_stats` | Get comprehensive database statistics |
| `get_schema` | Get database schema information |
| `get_stories` | Search and filter stories |
| `get_story_details` | Get detailed story information |
| `get_locations` | Get all locations with story counts |
| `get_authors` | Get all authors with story counts |
| `get_themes` | Get all themes with story counts |
| `insert_story` | Insert new stories into database |
| `query_database` | Execute safe SELECT queries |

## 🐛 **Troubleshooting**

### MCP Server Not Loading

1. **Check Cursor logs:**
   - Open Cursor Developer Tools (`Cmd/Ctrl + Shift + I`)
   - Look for MCP-related errors in Console

2. **Verify file paths:**
   - Ensure `mcp-server/supabase-server.js` exists
   - Check that paths in configuration are correct

3. **Test manually:**
   ```bash
   # Test the MCP server directly
   node mcp-server/supabase-server.js
   ```

### Database Connection Issues

1. **Check environment variables:**
   ```bash
   # Verify variables are loaded
   node -e "console.log(process.env.SUPABASE_URL)"
   ```

2. **Test Supabase connection:**
   ```bash
   node scripts/test-mcp-server.js
   ```

3. **Verify RLS policies:**
   - Ensure your database has proper RLS policies
   - Check that the service role key has necessary permissions

### Cursor Not Responding to Database Queries

1. **Restart Cursor** after configuration changes
2. **Check MCP server status** in Cursor settings
3. **Verify environment variables** are properly loaded
4. **Test with simple queries** first

## 🎯 **Advanced Usage**

### Custom Queries

You can ask Cursor to execute custom SQL queries:

```
"Execute this query: SELECT title, word_count FROM stories WHERE publication_year < 1900"
```

### Data Analysis

Ask Cursor to perform complex analysis:

```
"Analyze the geographical distribution of stories and create a summary report"
"Compare word counts across different time periods"
"Identify patterns in story themes by location"
```

### Development Tasks

Use MCP for development assistance:

```
"Help me write a React component that displays story statistics"
"Create a function to bulk import stories from CSV"
"Optimize my database queries for better performance"
```

## 🔒 **Security Considerations**

1. **Service Role Key:** The MCP server uses your Supabase service role key, which has full database access. Keep this secure.

2. **Query Restrictions:** The MCP server only allows SELECT queries for safety. INSERT/UPDATE/DELETE operations are handled through specific tools.

3. **Environment Variables:** Never commit your `.env` file to version control.

## 📈 **Next Steps**

Once MCP is working:

1. **Explore your data** with natural language queries
2. **Use Cursor for database optimization** and schema improvements
3. **Leverage MCP for development** of new features
4. **Analyze story collection results** from HyperBrowser
5. **Generate reports and insights** about your story database

## 🆘 **Getting Help**

If you encounter issues:

1. **Check the test script output:** `node scripts/test-mcp-server.js`
2. **Review Cursor developer console** for error messages
3. **Verify Supabase dashboard** for connection issues
4. **Test database access** manually with the Supabase client

---

## 🎉 **Success!**

Once everything is working, you'll have:

- ✅ **Real-time database access** in Cursor
- ✅ **Natural language database queries**
- ✅ **Intelligent development assistance**
- ✅ **Automated data analysis capabilities**
- ✅ **Enhanced debugging and optimization tools**

Your Cursor IDE now has superpowers for working with your StoryMap database! 🚀 