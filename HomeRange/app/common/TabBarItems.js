/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/21 下午8:44
 */
import React, { PureComponent } from 'react'
import { Image } from 'react-native'

class TabBarItem extends PureComponent {
    render() {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return (
            <Image
                source={this.props.focused
                    ? selectedImage
                    : this.props.normalImage}
                style={{ tintColor: this.props.tintColor, width: 20, height: 20 }}
            />
        );
    }
}

export default TabBarItem;
