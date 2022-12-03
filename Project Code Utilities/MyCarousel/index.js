  const crslAllImgs = this.shadowRoot.querySelector('.crsl-track');
  crslAllImgs.style.transform = `translateX(208px)`;
   var nextCount = -1;



 function nextFunction() {
        const crslAllImgs = this.shadowRoot.querySelector('.crsl-track');
        const crslImgs = this.shadowRoot.querySelectorAll('.crsl-img');
        const crslImgsLength = this.shadowRoot.querySelectorAll('.crsl-img').length;
        this.nextCount += 1;
        if (this.nextCount > crslImgsLength - 2) {
            this.nextCount = -1;
        }
        /*translateX is to move to next image by translateX direction with nextCount*208
        here 208(width of image(150)+the divider line and its padding(60)) */
        crslAllImgs.style.transform = `translateX(${this.nextCount*208*-1}px)`;
        /* below code is scale current image by 1.2 and other by 1 */
        if (this.nextCount > -1) {
            crslImgs[(this.nextCount)].style.transform = "scale(1)";
        }
        crslImgs[(this.nextCount) + 1].style.transform = "scale(1.2)";
        setTimeout(() => {
            this.renderImageOverlay();
        }, 400);
        if (this.nextCount < crslImgsLength - 1) {
            crslImgs[(this.nextCount) + 2].style.transform = "scale(1)";
        }
    }

    /* prevFunction is called onclick '<-' to view next image */
 function   prevFunction() {
        const crslAllImgs = this.shadowRoot.querySelector('.crsl-track');
        const crslImgs = this.shadowRoot.querySelectorAll('.crsl-img');
        const crslImgsLength = this.shadowRoot.querySelectorAll('.crsl-img').length;
        this.nextCount -= 1;

        if (this.nextCount < -1) {
            this.nextCount = crslImgsLength - 2;
        }
        /*translateX is to move to next image by translateX direction with nextCount*208
        here 208(width of image(150)+the divider line and its padding(60)) */
        crslAllImgs.style.transform = `translateX(${this.nextCount*208*-1}px)`;
        /* below code is scale current image by 1.2 and other by 1 */
        if (this.nextCount > -1) crslImgs[(this.nextCount)].style.transform = "scale(1)";
        crslImgs[(this.nextCount) + 1].style.transform = "scale(1.2)";
        setTimeout(() => {
            this.renderImageOverlay();
        }, 400);
        if (this.nextCount < crslImgsLength - 1) {
            crslImgs[(this.nextCount) + 2].style.transform = "scale(1)";
        }
    }

  function  renderImageOverlay() {
        // code to add overlay image
        const crslImgsLength = this.shadowRoot.querySelectorAll('.crsl-img').length;
        this.shadowRoot.querySelector('#rightOverlay').classList.add('overlayRight')
        this.shadowRoot.querySelector('#leftOverlay').classList.add('overlayLeft');
        if (this.nextCount < 0) {
            this.shadowRoot.querySelector('#leftOverlay').classList.remove('overlayLeft');
        }
        if (this.nextCount === crslImgsLength - 2) {
            this.shadowRoot.querySelector('#rightOverlay').classList.remove('overlayRight');
        }
    }
