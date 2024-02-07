import * as vscode from "vscode";

async function filterTextBySelection(options: { exclude: boolean }) {
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

  const f = options.exclude
    ? (l: string) => !l.includes(selectedText)
    : (l: string) => l.includes(selectedText);

  const content = text.split(/\r?\n/).filter(f).join("\n") + "\n";

  if (!content.trim()) {
    return;
  }

  const document = await vscode.workspace.openTextDocument({ content });
  vscode.window.showTextDocument(document);
}

async function filterTextBySelectionCmd() {
  await filterTextBySelection({ exclude: false });
}

async function excludeTextBySelectionCmd() {
  await filterTextBySelection({ exclude: true });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "right-click-filter.filterTextBySelection",
      filterTextBySelectionCmd
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "right-click-filter.excludeTextBySelection",
      excludeTextBySelectionCmd
    )
  );
}

export function deactivate() {}
