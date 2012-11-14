require([
],
function() {
/*
	Self-initializing modules are objects which are not directly referenced by other modules within the project but
	still need to be loaded.  Typically, they self-initialize and are only loosely-coupled to other modules (communicating
	via events).

	These modules are placed in a single location for tracking purposes.

	!! IMPORTANT !!
	Please keep in mind that inclusion within this module guarantees that these modules will be loaded (regardless if they are 
	truly needed).
*/
});
