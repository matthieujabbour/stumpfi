2.1.1 / 2017-10-20
==================

# General
 - Fixed package structure to match with the types declarations

# Bug Fixes
 - Cyclic dependencies between page masters (A has a master B which has a master A) are now forbidden, and raise an error


2.1.0 / 2017-10-16
==================

# General
 - Fixed types declarations to match with the real package structure


2.0.0 / 2017-10-14
==================

# General
 - Package restructuration : renderer and filesystem methods now have their own repository (see [stumpfi-renderer](https://github.com/matthieujabbour/stumpfi-renderer) and [stumpfi-io](https://github.com/matthieujabbour/stumpfi-io) packages)
 - Entities major redesign : Themes don't exist anymore, they have been replaced by a Pages inheritance system
 - Pages can now contain CustomResources


1.0.0 / 2017-09-26
==================

# General
 - 1.0.0 release


1.0.0 / 2017-08-26
==================

# General
 - Initial commmit.