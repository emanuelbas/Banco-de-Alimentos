function toggleClasses(contentToShow,contentToHide,classes){
	for (CSSClass of classes) {
	contentToHide.classList.remove(CSSClass);
	contentToShow.classList.add(CSSClass);
	}
}