
function RefactoringSessionManager() {
	this.refactoring_storage = new RefactoringStorage();
	this.instantiated_refactorings = [];
	this.versions = [];
}

RefactoringSessionManager.prototype.addRefactoringForURL = function (url, aRefactoring) {
	this.instantiated_refactorings.push(new InstantiatedRefactoring(url, aRefactoring));
}

RefactoringSessionManager.prototype.saveSessionAsVersion = function(version_name) {
	let serialized_refactorings = this.serializeRefactorings();
	this.versions.push({"version_name":version_name, "data":serialized_refactorings});
	//this.storeAsVersion(version_name, serialized_refactorings);
}

RefactoringSessionManager.prototype.getVersions = function () {
	return this.versions;
}

RefactoringSessionManager.prototype.serializeRefactorings = function () {
	let serialized = [];
	for (var i = this.instantiated_refactorings.length - 1; i >= 0; i--)
		serialized.push(this.instantiated_refactorings[i].serialize());
	return serialized;
}

RefactoringSessionManager.prototype.storeAsVersion = function(version_name,serialized_refactorings){
	let objectToSerializedAndSendInMessage = {"serialized_refactorings":serialized_refactorings, "version_name":version_name};

}

RefactoringSessionManager.prototype.user_version = function(aName) {
	this.refactoring_storage.set_current_version(aName);
}

RefactoringSessionManager.prototype.resetSession = function(){
	this.instantiated_refactorings = [];
	//document.location.reload();
}


RefactoringSessionManager.prototype.onLoad = function(){

}