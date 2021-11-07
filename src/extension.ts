import * as vscode from 'vscode';
import * as debounce from 'debounce';
import * as complexity from './complexity/complexity';

let complexityStatusBarItem: vscode.StatusBarItem;

// Time in ms to wait before processing changes to text
const debounceDuration = 300;

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
    vscode.workspace.onDidChangeTextDocument(
      debounce(updateStatusBarItem, debounceDuration)
    )
  );

  // update status bar item once at start
  updateStatusBarItem();
}

/**
 * Get text from a valid file type
 */
function getTextFile(): string | undefined {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (activeTextEditor) {
    const isValidFile = Boolean(
      activeTextEditor.document.fileName.match(/(txt|md)/)?.length
    );

    if (isValidFile) {
      return activeTextEditor.document.getText();
    }
  }

  return undefined;
}

/**
 * Update what the status bar is showing regarding text complexity
 */
function updateStatusBarItem(): void {
  const text = getTextFile();

  if (text) {
    complexityStatusBarItem.text = complexity.getComplexityLabel(text);
    complexityStatusBarItem.show();
  } else {
    complexityStatusBarItem.hide();
  }
}

/**
 * Show information about the complexity of the user's English-language writing
 */
function showComplexityDetails(): void {
  const text = getTextFile();

  if (text) {
    const config = vscode.workspace.getConfiguration('checkComplexity');
    const gradeFormula: string | undefined = config.get('gradeFormula');

    vscode.window.showInformationMessage(
      complexity.getComplexityDetails(text, gradeFormula),
      { modal: true }
    );
  } else {
    vscode.window.showErrorMessage(
      'Check Complexity only really makes sense in plaintext or markdown files.'
    );
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
