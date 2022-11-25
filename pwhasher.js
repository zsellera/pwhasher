#! /usr/bin/env node

const PassHashCommon = require('./lib/passhashcommon.js');
const fs = require('fs');
const homedir = require('os').homedir();
const readline = require('readline');
const clipboardPromise = import('clipboardy');


function generateHash (policy, tag, input) {
    let tag0 = PassHashCommon.generateHashWord (
        policy.seed,
        tag,
        24,
        true, // require digits
        true, // require punctuation
        true, // require mixed case
        false, // no special characters
        false // only digits
    );

	return PassHashCommon.generateHashWord (
		tag0.replace(/^\*+/, ''),
		input,
		policy.length,
		true, // require digits
		policy.strength > 1, // require punctuation
		true, // require mixed case
		policy.strength < 2, // no special characters
		policy.strength == 0 // only digits
	);
}

 

let database = fs.readFileSync(homedir + '/.pwhasher.json');
let config = JSON.parse(database);

let tag = process.argv[2] || '';

let policy = {
    seed: config.options.privateSeed,
    length: process.argv[3] || config.options.defaultLength,
    strength: process.argv[4] || config.options.defaultStrength,
};

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
        rl.output.write("\x1B[2K\x1B[200D" + rl.query);
    else
        rl.output.write(stringToWrite);
};

rl.stdoutMuted = true;
rl.query = 'Password: ';
rl.question(rl.query, function(password) {
    let hash = generateHash(policy, tag, password.trim());
    clipboardPromise
        .then(cbModule => cbModule.default.writeSync(hash))
        .then(console.log('Hash copied to clipboard'));
    rl.close();
});
