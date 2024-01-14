import * as vscode from "vscode";

async function filterTextBySelection() {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor) {
    return;
  }

  const selectedText = activeTextEditor.document
    .getText(activeTextEditor.selection)
    .trim();

  if (!selectedText) {
    return;
  }

  const text = activeTextEditor.document.getText().trim();

  if (!text) {
    return;
  }

  const content =
    text
      .split(/\r?\n/)
      .filter((line) => line.includes(selectedText))
      .join("\n") + "\n";

  if (!content.trim()) {
    return;
  }

  const document = await vscode.workspace.openTextDocument({ content });
  vscode.window.showTextDocument(document);
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "right-click-filter.filterTextBySelection",
    filterTextBySelection
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
