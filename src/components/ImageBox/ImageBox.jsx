import React, { useState } from 'react';
import { Button, Checkbox, Row, Col, Dropdown, Menu, message, Modal } from 'antd';
import css from './index.scss';

const ImageGrid = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [isMultipleSelect, setIsMultipleSelect] = useState(false);
    const [modal, contextHolder] = Modal.useModal();

    message.config({
        maxCount: 1,
        duration: 2,
    });

    const imagesByDate = [
        {
            month: '2024年10月',
            images: [
                {
                    url: './logo512.png',
                    clientId: '123456',
                },
                {
                    url: './logo512.png',
                    clientId: 'ddassdasd',
                },
                {
                    url: './logo512.png',
                    clientId: 'ascdascca',
                },
                {
                    url: './logo512.png',
                    clientId: 'ascsafbgb',
                },
                {
                    url: './logo512.png',
                    clientId: 'asdasd',
                },
                {
                    url: './logo512.png',
                    clientId: '1212de',
                },
                {
                    url: './logo512.png',
                    clientId: '3ewqdas',
                },
                {
                    url: './logo512.png',
                    clientId: '2eqwdasd',
                },
            ],
        },
        {
            month: '2024年11月',
            images: [
                {
                    url: './logo512.png',
                    alt: '1',
                    clientId: '123412312356',
                },
                {
                    url: './logo512.png',
                    alt: '2',
                    clientId: 'ddassdas21e2d',
                },
                {
                    url: './logo512.png',
                    alt: '3',
                    clientId: '222221edsdfcs',
                },
                {
                    url: './logo512.png',
                    alt: '4',
                    clientId: 'ascs2afb2222gb',
                },
                {
                    url: './logo512.png',
                    alt: '5',
                    clientId: 'asd2a2222sd',
                },
                {
                    url: './logo512.png',
                    alt: '6',
                    clientId: '12122222de',
                },
                {
                    url: './logo512.png',
                    alt: '7',
                    clientId: '3ewq22222das',
                },
                {
                    url: './logo512.png',
                    alt: '8',
                    clientId: '2eqwd2222asd',
                },
            ],
        },
    ];

    const isSelected = (item) => {
        for (let i = 0; i < selectedImages.length; i++) {
            if (selectedImages[i].clientId === item.clientId) {
                return true;
            }
        }
        return false;
    };

    const handleImageSelect = (item) => {
        const newSelection = isSelected(item)
            ? selectedImages.filter((i) => i.clientId !== item.clientId)
            : [...selectedImages, item];

        // Limit selection to 5 images
        if (newSelection.length <= 5) {
            setSelectedImages(newSelection);
        } else {
            message.warning('单次最多选择5张图片');
        }
    };

    const downloadSelectedFile = () => {
        console.log(selectedImages);
    };

    const cancelMultipleSelection = () => {
        setIsMultipleSelect(false);
        setSelectedImages([]); // 取消多选时清空选择
    };

    const onMenu = async (e) => {
        e.domEvent.nativeEvent.stopImmediatePropagation();
        if (e.key == 'download') {
            deleteAll();
        } else if (e.key == 'collection') {
            console.log('收藏');
        } else if (e.key == 'knowledge') {
            console.log('知识库');
        } else if (e.key == 'group') {
            console.log('群文件');
        }
    };

    const menu = (
        <Menu onClick={onMenu}>
            <Menu.Item key="download">下载</Menu.Item>
            <Menu.SubMenu title="添加到">
                <Menu.Item key={'collection'}>收藏</Menu.Item>
                <Menu.Item key={'knowledge'}>知识库</Menu.Item>
                <Menu.Item key={'group'}>群文件</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );



    const deleteAll = () => {
        modal.confirm({
            title: '确认删除',
            content: '确认删除所选图片？',
            onOk: () => {
                deleteOk();
            },
            okText: '确认',
            cancelText: '取消',
            okType: 'primary',
            okButtonProps: { danger: true },
            onCancel: () => {
                console.log('onCancel');
            },
        });
    };

    const deleteOk = () => {
        console.log('deleteOk');
    };

    const showImg = (image) => {
        console.log(image);
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <div>
                    <>
                        <Button
                            key="download"
                            type="primary"
                            onClick={downloadSelectedFile}
                            disabled={selectedImages.length === 0}
                        >
                            下载
                        </Button>
                        <Dropdown trigger={['click']} overlay={menu} disabled={selectedImages.length === 0}>
                            <Button>添加到</Button>
                        </Dropdown>
                        <Button danger disabled={selectedImages.length === 0} onClick={deleteAll}>
                            删除
                        </Button>
                    </>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            if (isMultipleSelect) {
                                cancelMultipleSelection(); // 取消多选并清空选中的图片
                            } else {
                                setIsMultipleSelect(true); // 进入多选模式
                            }
                        }}
                    >
                        {isMultipleSelect ? '取消' : '多选'}
                    </Button>
                </div>
            </div>
            <div className={css.content}>
                {imagesByDate.map((item) => (
                    <div key={item.month}>
                        <p>{item.month}</p>
                        <Row>
                            {item.images.map((image, index) => (
                                <Col span={6} key={index}>
                                    <div
                                        className={`${css.fileBox} `}
                                        onClick={() => isMultipleSelect ? handleImageSelect(image) : showImg(image)}
                                    >
                                        <Dropdown
                                            trigger={'contextMenu'}
                                            overlay={menu}
                                            disabled={isMultipleSelect}
                                        >
                                            <img
                                                src={image.url}
                                                className={css.fileImg}
                                                onError={() => { console.log('error') }}
                                            />
                                        </Dropdown>

                                        {isMultipleSelect && (
                                            <Checkbox
                                                className={css.checkbox}
                                                checked={isSelected(image)}
                                                // onChange={() => handleImageSelect(image)}
                                                disabled={selectedImages.length >= 5 && !isSelected(image)} // 设置复选框禁用逻辑
                                                style={{ position: 'absolute', zIndex: 1 }}
                                            />
                                        )}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </div>
            {contextHolder}
        </div>
    );
};

export default ImageGrid;
