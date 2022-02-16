# ServerList+ Desktop App

*This tool is experimental - some features might not work*

A desktop app version of ServerList+. A recent rate limit on socket connections
imposed by the Starblast devs results in occasional failures in fetching player lists
and stack rating on certain games. Rather than make a request
to the ServerList+ server to get detailed system info, the desktop app makes the request 
locally from the user's own IP, making the rate limit be for that user only, 
rather than all the users of the web version of ServerList+. 

### Installation

Download the appropriate distributable for your system from the releases page.

### Building from source

*Requires Node.js > 15 and Yarn*

Clone the repository

```bash
git clone https://github.com/dpleshkov/serverlist-plus-desktop
```

Change into the directory

```bash
cd serverlist-plus-desktop/
```

Install dependencies and build

```bash
yarn install
yarn dist
```

Build results should output to the `dist/` directory.