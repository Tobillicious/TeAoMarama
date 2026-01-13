#!/bin/bash

echo "🔧 Fixing VS Code ShellCheck Integration..."

# Check if shellcheck is available
if command -v shellcheck &> /dev/null; then
    echo "✅ ShellCheck found at: $(which shellcheck)"
else
    echo "❌ ShellCheck not found in PATH"
    exit 1
fi

# Update VS Code settings
cat > .vscode/settings.json << 'EOF'
{
  "shellcheck.enable": true,
  "shellcheck.executablePath": "/Users/admin/bin/shellcheck",
  "shellcheck.customArgs": [],
  "shellcheck.exclude": [],
  "shellcheck.lintOnSave": true,
  "shellcheck.run": "onType",
  "shellcheck.shell": "/bin/zsh",
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.profiles.osx": {
    "zsh": {
      "path": "/bin/zsh",
      "args": ["-l"],
      "env": {
        "PATH": "/Users/admin/bin:$PATH"
      }
    }
  },
  "files.associations": {
    "*.sh": "shellscript"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.shellcheck": true
  }
}
EOF

echo "✅ VS Code settings updated"
echo "🔄 Please restart VS Code to apply changes"
echo "🎉 VS Code ShellCheck Fix Complete!"
