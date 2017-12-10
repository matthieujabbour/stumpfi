v4.0.0 / 2017-12-10
===================

# General
 - Updated package structure and dependencies
 - Full code unit testing, 100% code coverage
 - Deeply refactored Component and Content classes
 - Introduced ContentTypes enum
 - Document, Page and Template classes now extend the new ResourceContainer class

# Features
 - Introduced Templates, that allow to build complex standalone components

# Documentation
 - Improved some wordings.


v3.0.0 / 2017-11-02
===================

# General
 - Class refactoring : CustomResource type has been replaced by the Resource class inherited from Entity.

# Documentation
 - Improved some wordings.


v2.1.1 / 2017-10-20
===================

# General
 - Fixed package structure to match with the types declarations

# Bug Fixes
 - Cyclic dependencies between page masters (A has a master B which has a master A) are now forbidden, and raise an error


v2.1.0 / 2017-10-16
===================

# General
 - Fixed types declarations to match with the real package structure


v2.0.0 / 2017-10-14
===================

# General
 - Package restructuration : renderer and filesystem methods now have their own repository (see [stumpfi-renderer](https://github.com/matthieujabbour/stumpfi-renderer) and [stumpfi-io](https://github.com/matthieujabbour/stumpfi-io) packages)
 - Entities major redesign : Themes don't exist anymore, they have been replaced by a Pages inheritance system
 - Pages can now contain CustomResources


v1.0.0 / 2017-08-26
===================

# General
 - Initial release.