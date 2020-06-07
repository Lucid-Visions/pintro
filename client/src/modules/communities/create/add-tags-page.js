import React from 'react'

import TagsData from "../../../assets/TagsData";
import Tag from "../../../components/Tag";
import {
    title2,
    subTitle2,
    ctaText2
} from './constants';

const CreateCommunityAddTags = () => {
    Array.prototype.chunk = function(n) {
      if (!this.length) {
        return [];
      }
      return [this.slice(0, n)].concat(this.slice(n).chunk(n));
    };

    const { navigation } = this.props;
    const tagsItems = TagsData.map((item, index) => (
      <Tag key={index} item={item} i={3} callback={this.tagCallback} />
    ));

    return (
        <ScrollView
            style={styles.container2}
            showsVerticalScrollIndicator={false}
        >
        <SafeAreaView style={styles.container1}>
          <View style={styles.container}>
            <BackButton navigation={navigation} />

            <View>
              <Text style={styles.h1}>{title2}</Text>
              <Text style={styles.h2}>{subTitle2}</Text>
            </View>

            <View paddingTop={70}>
              <Text style={styles.h2}>{fieldTitle2}</Text>
              <View style={styles.tagScrollContainer}>
                <ScrollView style={styles.tagScrollView} horizontal={true}>
                  <View >
                    <View style={styles.tags}>{tagsItems.chunk(4)[0]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[1]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[2]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[3]}</View>
                  </View>
                </ScrollView>
              </View>
            </View>

            <View paddingTop={20} alignSelf={'center'}>
                    <TouchableOpacity onPress={() => this.update(navigation)} underlayColor="white">
                        <WideButtonComponent
                            value={ctaText2}
                            source={require("../assets/arrow-right-white.png")}
                            containerStyle={{
                            ...styles.btn
                            }}
                            textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
                        />
                    </TouchableOpacity>
                </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
}

export default CreateCommunityAddTags