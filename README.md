# pwhasher command line interface

Once upon a time there was the `Password Hasher Plus` Chrome and Firefox extension. As these extensions are not popular anymore, and not even available nowadays, I created a cli to manage my old passwords.

## Usage

* `npm install @zsellera/pwhasher`
* backup your database to `~/.pwhasher.json`, `chmod 400 ~/.pwhasher.json`
* `pwhasher site_tag [pass_len [pass_strength]]`
  * Password strength: 0 - numeric only, 1 - alphanumeric, 2 - alphanumeric+special

The password is then copied to your keyboard.
## Examples

* `pwhasher google` - default settings for `google` site tag
* `pwhasher google 10` - password length is 10
* `pwhasher google 12 2` - a password of alphanumeric+special characters and a length of 12
