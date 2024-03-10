import * as core from '@actions/core'
import { exec } from 'child_process';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const stack: string = core.getInput('cdk_stack')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Stack is ${stack}...`);

    const command = `cdk deploy -e ${stack}`;

    // execute the command
    exec(command, (error, stdout, stderr) => {
      if (error) {
         console.error(`exec error: ${error}`);
         return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
  catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
