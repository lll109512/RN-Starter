import React from 'react';
import {Box, Button, Modal, Row, Text} from 'native-base';
import {useTranslation} from 'react-i18next';

const ModalView = (props) => {
    const {t} = useTranslation('app');
    const {
        open,
        onClose,
        children,
        stopSwipeModal,
        cancelTitle = t('cancel'),
        saveTitle = t('save'),
        title,
        onSave,
        isConfirmLoading,
        ...other
    } = props;
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            animationPreset="slide"
            avoidKeyboard
            size="full">
            <Modal.Content marginBottom={0} marginTop="auto" safeAreaBottom>
                <Modal.CloseButton />
                {title && <Modal.Header>{title}</Modal.Header>}
                <Modal.Body pt={title ? 0 : 12}>{children}</Modal.Body>
                {(onSave || onClose) && (
                    <Modal.Footer>
                        <Row space={2} justifyContent="center" w="full">
                            {onClose && (
                                <Button
                                    flexGrow={1}
                                    variant={'cancel'}
                                    onPress={onClose}>
                                    {cancelTitle}
                                </Button>
                            )}
                            {onSave && (
                                <Button
                                    flexGrow={1}
                                    variant={'primary'}
                                    onPress={onSave}
                                    title={saveTitle}
                                    isLoading={isConfirmLoading}
                                    isLoadingText={t('submitting')}>
                                    {saveTitle}
                                </Button>
                            )}
                        </Row>
                    </Modal.Footer>
                )}
            </Modal.Content>
        </Modal>
    );
};

export default ModalView;
