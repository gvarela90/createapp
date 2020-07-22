# Createapp

This is a simple project generator.

## Usage

First get createapp
```sh
$ npm install -g git+https://github.com/gvarela90/createapp.git
```
Now run
```sh
$ createapp
```

You'll be prompted for some values. Provide them.

You can also provide the values running

```sh
$ createapp --name=myawsomeproject --template=backend --description="This is my awsome project."
```

Enter the project
```sh
$ cd myawsomeproject
```

Create a git repo and push it there:
```sh
$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin git@github.com:CHANGEHERE/myawsomeproject.git
$ git push -u origin master
```
