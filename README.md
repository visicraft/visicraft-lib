# visicraft-lib

## Description

...

## RxDB Issue

Currently `visicraft-lib` is not building properly for Browser with [`/rxdb`]() installed as a dependency. However the library is built to be isomorphic in that it searches for the fully built browserify build of `rxdb` on `window.RxDB`, when running in Browser. This however requires you to install `rxdb` as a peer dependency.
