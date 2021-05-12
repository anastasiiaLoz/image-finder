import React, { Component } from 'react';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
    static defaultProps = {
        open: false,
    }
    static propTypes = {
        open: PropTypes.bool,
        onClose: PropTypes.bool,
    }.isRequired

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDownCloseModal)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDownCloseModal)
    }

    onKeyDownCloseModal = evt => {
        if(evt.code === 'Escape'){
            this.props.onClose()
        }
    }

    onCloseBackdropModal = (evt) => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    }


    render() {
        const { open } = this.props;

        return createPortal(
            open ? (
                <div className="Overlay" onClick={this.onCloseBackdropModal }>
                    <div className="Modal">
                        <img src={ this.props.largeImageURL} alt="" />
                    </div>
                </div>
            ) : null, modalRoot
        )
    }
}
