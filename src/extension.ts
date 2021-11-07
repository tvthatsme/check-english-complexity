import * as vscode from 'vscode';
import * as complexity from './complexity/complexity';

let complexityStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // register a command that is invoked when the status bar item is selected
  const commandId = 'check-english-complexity.checkComplexity';

  // register command to manually check the complexity of written text
  context.subscriptions.push(
    vscode.commands.registerCommand(commandId, showComplexityDetails)
  );

  // create a new status bar item that we can now manage
  complexityStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  complexityStatusBarItem.command = commandId;
  context.subscriptions.push(complexityStatusBarItem);

  // register some listener that make sure the status bar is item always up-to-date
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );

  // update status bar item once at start
  updateStatusBarItem();
}

function updateStatusBarItem(): void {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (activeTextEditor) {
    const text = activeTextEditor.document.getText();
    complexityStatusBarItem.text = complexity.getComplexityLabel(text);
    complexityStatusBarItem.show();
  } else {
    complexityStatusBarItem.show();
  }
}

function showComplexityDetails(): void {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (activeTextEditor) {
    const text = activeTextEditor.document.getText();
    vscode.window.showInformationMessage(
      complexity.getComplexityDetails(text),
      { modal: true }
    );
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
