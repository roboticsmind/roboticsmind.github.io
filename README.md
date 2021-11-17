# RoboticsMind Labs website

## Prerequisities

`node v11.15.0`


In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

## Usage

### Build

to build the website, issue the following command:

```shell
$ docker build -t roboticsmind:dev .
```

### Run

The following instruction starts a webpack server
@port 8080 which is then forwarded to @port 3001.
You should access the website by openning your browser
to http://localhost:3001/.

```shell
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:8080 \
    -e CHOKIDAR_USEPOLLING=true \
    roboticsmind:dev
```
