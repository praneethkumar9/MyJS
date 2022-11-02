/**
 * Component CarouselImage is defined as
 * `<e-carousel-image>`
 *
 * Imperatively create component
 * @example
 * let component = new CarouselImage();
 *
 * Declaratively create component
 * @example
 * <e-carousel-image></e-carousel-image>
 *
 * @extends {LitComponent}
 */
import {
    definition
} from '@eui/component';
import {
    repeat,
    LitComponent,
    html
} from '@eui/lit-component';
import style from './carouselImage.css';

/**
 * @property {number} nextCount - show active image.
 * @property {array} images - List of images for given POI.
 */
@definition('e-carousel-image', {
    style,
    home: 'carousel-image',
    props: {
        nextCount: {
            attribute: false,
            type: 'number',
            default: 0
        },
        images: {
            attribute: true,
            type: 'array',
            default: []
        }
    },
})
export default class CarouselImage extends LitComponent {
    /**
     * Render the <e-carousel-image> component. This function is called each time a
     * prop changes.
     */
    constructor() {
        super();
        this.prevFunction = this.prevFunction.bind(this);
        this.nextFunction = this.nextFunction.bind(this);
        this.renderImageOverlay = this.renderImageOverlay.bind(this);
        this.nextCount = 0;

    }
    componentDidRender(prev) {
        /*to check images props has changed,i.e if its changed,then user has selected new POI,
        so to reset nextCount and reet corousel position */
        if (prev.images !== this.images) {
            const crslAllImgs = this.shadowRoot.querySelector('.crsl-track');
            crslAllImgs.style.transform = `translateX(208px)`;
            this.nextCount = -1;
            const crslImgsLength = this.shadowRoot.querySelectorAll('.crsl-img').length;
            this.shadowRoot.querySelector('#leftOverlay').classList.remove('overlayLeft');
            this.shadowRoot.querySelector('#rightOverlay').classList.remove('overlayRight');
            if (crslImgsLength > 1) {
                this.shadowRoot.querySelector('#rightOverlay').classList.add('overlayRight');
            }
        }
    }
    didConnect() {
        this.nextCount = -1;
    }


    /* nextFunction is called onclick '->' to view next image */
    nextFunction() {
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
    prevFunction() {
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

    renderImageOverlay() {
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

    render() {
        return html `
        <div class="crsl-ctn">
        <div class="shadow-ctn left" id="leftOverlay"></div>
        <div class="crsl-track">
            ${repeat(
            this.images,
            images => html`
            <div class="crsl-img-ctn">
                <img src=${config.PYTHEAS_IMAGE + images} alt="poi images" class="crsl-img">
            </div>
            <div class="crsl-img-ctn v-divider"></div>`,
            )}
        </div>
        <div class="shadow-ctn right" id="rightOverlay"></div>
        </div>
        <div class="crsl-controls">
        <eui-v0-icon slot="bottom" name="arrow-left" size="25px" color="var(--blue)" class="crsl-prev"
            @click=${this.prevFunction} primary>prev</eui-v0-icon>
        <eui-v0-icon slot="bottom" name="arrow-right" size="25px" color="var(--blue)" class="crsl-next"
            @click=${this.nextFunction} primary>next</eui-v0-icon>
        </div>
`;
    }
}

/**
 * Register the component as e-carousel-image.
 * Registration can be done at a later time and with a different name
 */
CarouselImage.register();