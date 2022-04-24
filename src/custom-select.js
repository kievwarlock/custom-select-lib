import {
    CUSTOM_SELECT_CLASSNAME_WRAPPER,
    CUSTOM_SELECT_CLASSNAME_HIDDEN,
    CUSTOM_SELECT_CLASSNAME_OPTION,
    CUSTOM_SELECT_CLASSNAME_OPTIONS,
    CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED,
    CUSTOM_SELECT_CLASSNAME_HEAD,
    CUSTOM_SELECT_CLASSNAME_VALUE,
    CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN,
    CUSTOM_ON_CHANGE_EVENT,
} from './constants';

const defaultSettings = {
    containerClass: '',
    selectValueClass: '',
    headClass: '',
    optionsClass: '',
};

export function CustomSelect(selector, settings = defaultSettings) {
    if (!validateSelectElement(selector)) {
        throw new Error('Validation select element error!');
    }
    const newOnChange = new Event(CUSTOM_ON_CHANGE_EVENT);

    const originSelectElement = document.querySelector(selector);
    const globalNewSelectElement = document.createElement('div');
    const globalSelectValueElement = document.createElement('div');
    const newSelectHeadElement = document.createElement('div');
    const newOptionsElement = document.createElement('div');

    originSelectElement.insertAdjacentElement(
        'beforebegin',
        globalNewSelectElement,
    );
    globalNewSelectElement.append(originSelectElement);

    addMainClassNames();
    addAdditionalClassNames();
    createNewSelectHead();
    createNewSelectOptions();
    addOutsideClickEvent();

    function addMainClassNames() {
        originSelectElement.classList.add(CUSTOM_SELECT_CLASSNAME_HIDDEN);
        globalNewSelectElement.classList.add(CUSTOM_SELECT_CLASSNAME_WRAPPER);
        globalSelectValueElement.classList.add(CUSTOM_SELECT_CLASSNAME_VALUE);
        newSelectHeadElement.classList.add(CUSTOM_SELECT_CLASSNAME_HEAD);
        newOptionsElement.classList.add(CUSTOM_SELECT_CLASSNAME_OPTIONS);
    }

    function addAdditionalClassNames() {
        const { containerClass, headClass, optionsClass, selectValueClass } =
            settings;

        if (containerClass) {
            globalNewSelectElement.classList.add(containerClass);
        }
        if (selectValueClass) {
            globalSelectValueElement.classList.add(selectValueClass);
        }
        if (headClass) {
            newSelectHeadElement.classList.add(headClass);
        }
        if (optionsClass) {
            newOptionsElement.classList.add(optionsClass);
        }
    }

    function validateSelectElement(element) {
        if (element && typeof element === 'string') {
            const elementItem = document.querySelectorAll(element)?.[0];

            if (
                elementItem instanceof HTMLElement &&
                elementItem.tagName.toUpperCase() === 'SELECT'
            ) {
                return true;
            }
        }

        return false;
    }

    function createNewSelectHead() {
        newSelectHeadElement.addEventListener('click', () => {
            globalNewSelectElement.classList.toggle(
                CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN,
            );
        });

        const { label } = getValue();
        globalSelectValueElement.innerText = label;
        newSelectHeadElement.appendChild(globalSelectValueElement);
        globalNewSelectElement.append(newSelectHeadElement);
    }

    function createNewSelectOptions() {
        const { value: selectedOptionValue } = getValue();

        for (const optionItem of originSelectElement.options) {
            const newOptionItemElement = document.createElement('div');
            newOptionItemElement.classList.add(CUSTOM_SELECT_CLASSNAME_OPTION);
            if (optionItem.value === selectedOptionValue) {
                newOptionItemElement.classList.add(
                    CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED,
                );
            }
            newOptionItemElement.setAttribute('data-value', optionItem.value);
            newOptionItemElement.innerText = optionItem.label;
            newOptionItemElement.addEventListener('click', (e) => {
                setValue(e.target.getAttribute('data-value'));
            });
            newOptionsElement.append(newOptionItemElement);
        }

        globalNewSelectElement.append(newOptionsElement);
    }

    function addOutsideClickEvent() {
        document.addEventListener('click', (e) => {
            if (!globalNewSelectElement.contains(e.target)) {
                closeMenu();
            }
        });
    }

    function closeMenu() {
        globalNewSelectElement.classList.remove(
            CUSTOM_SELECT_CLASSNAME_OPTIONS_IS_OPEN,
        );
    }

    function setValue(value) {
        globalNewSelectElement
            .querySelectorAll(`.${CUSTOM_SELECT_CLASSNAME_OPTION}`)
            .forEach((item) => {
                item.classList.remove(CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);
                const dataValue = item.getAttribute('data-value');

                if (dataValue === value) {
                    originSelectElement.value = value;
                    globalSelectValueElement.innerText = item.innerHTML;
                    item.classList.add(CUSTOM_SELECT_CLASSNAME_OPTION_SELECTED);
                    closeMenu();
                    globalNewSelectElement.dispatchEvent(newOnChange);
                }
            });
    }

    function getValue() {
        return {
            label: originSelectElement.selectedOptions?.[0].label,
            value: originSelectElement.selectedOptions?.[0].value,
        };
    }

    function onChange(callback) {
        if (typeof callback !== 'function') return;

        globalNewSelectElement.addEventListener(CUSTOM_ON_CHANGE_EVENT, () => {
            callback(getValue());
        });
    }

    return {
        setValue,
        getValue,
        onChange,
    };
}

global.CustomSelect = CustomSelect;
