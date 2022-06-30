import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import ModalView from 'components/ModalView';
import PropTypes, {shape} from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useLocale} from 'hooks/useLocale';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorModeValue, useToken } from 'native-base';
import { designSystemColors } from 'config/theme';
const screen = Dimensions.get('screen');

export const DatePickerModal = (props) => {
    const {t} = useTranslation('app');
    const {open, onClose, datePickerProps, onSave,title} = props;
    const [date, setDate] = useState(props.date || new Date());
    const {locale} = useLocale();
    const textColor = useToken('colors', useColorModeValue(designSystemColors.light.dark,designSystemColors.dark.dark));
    useEffect(() => {
        if (props.date) {
            setDate(props.date);
        }
    }, [props.date]);

    const onSave_ = () => {
        onSave(date);
    };
    const onClose_ = () => {
        setDate(props.date || new Date());
        onClose();
    };

    const picker = useMemo(
        () => (
            <DatePicker
                date={date}
                onDateChange={setDate}
                mode="date"
                locale={locale}
                textColor={textColor}
                {...datePickerProps}
            />
        ),
        [date, datePickerProps],
    );
    return (
        <ModalView
            open={open}
            onClose={onClose_}
            onSave={onSave_}
            title={title}>
            <View style={styles.vCenter}>{picker}</View>
        </ModalView>
    );
};
DatePickerModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    datePickerProps: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    date: PropTypes.any,
    title: PropTypes.string,
};

export const DateTimePickerModal = (props) => {
    const {t} = useTranslation('app');
    return <DatePickerModal
        title={t('pickDateTime')}
        {...props}
        datePickerProps={{
            ...(props.datePickerProps || {}),
            mode: 'datetime',
        }}
    />
}


export const TimePickerModal = (props) => {
    const {t} = useTranslation('app');
    return (
        <DatePickerModal
            title={t('pickTime')}
            {...props}
            datePickerProps={{
                ...(props.datePickerProps || {}),
                mode: 'time',
            }}
        />
    );
}

export const OptionsPickerModal = (props) => {
    const {
        open,
        onClose,
        pickerProps,
        options = [],
        onSave,
        title=' ',
        mutiple = false,
    } = props;
    const [selected, setSelected] = useState(
        props.selected || mutiple ? [] : null,
    );
    useEffect(() => {
        if (props.selected) {
            setSelected(props.selected);
        }
    }, [props.selected]);

    const onSave_ = () => {
        onSave(selected);
    };

    const onClose_ = () => {
        setSelected(props.selected || null);
        onClose();
    };

    const onPressMutiple = (value) => {
        if (selected.includes(value)) {
            setSelected((c) => c.filter((v) => v !== value));
        } else {
            setSelected((c) => [...c, value]);
        }
    };

    const picker = mutiple
        ? useMemo(
              () => (
                  <ScrollView
                      style={{maxHeight: screen.height / 3, marginTop: 12}}>
                      {options.map((item) => (
                          <TouchableOpacity
                              key={item.value}
                              activeOpacity={0.6}
                              onPress={() => onPressMutiple(item.value)}
                              disabled={item.disabled}>
                              <View style={styles.optionLineItem}>
                                  <Text
                                      numberOfLines={1}
                                      style={[
                                          styles.optionLineItemLabel,
                                          {opacity: item.disabled ? 0.4 : 1},
                                      ]}>{`${item.label}`}</Text>
                                  {selected.includes(item.value) && (
                                      <Ionicons
                                          name="checkmark-outline"
                                          color={'black'}
                                          style={{
                                              opacity: item.disabled ? 0.4 : 1,
                                          }}
                                          size={30}
                                      />
                                  )}
                              </View>
                          </TouchableOpacity>
                      ))}
                  </ScrollView>
              ),
              [selected, options, pickerProps],
          )
        : useMemo(
              () => (
                  <Picker
                      selectedValue={selected}
                      onValueChange={(itemValue, itemIndex) =>
                          setSelected(itemValue)
                      }
                      {...pickerProps}>
                      {options.map((item) => (
                          <Picker.Item
                              label={`${item.label}`}
                              value={item.value}
                              key={item.value}
                          />
                      ))}
                  </Picker>
              ),
              [selected, options, pickerProps],
          );

    return (
        <ModalView
            open={open}
            onClose={onClose_}
            onSave={onSave_}
            title={title}>
            <View style={styles.optionPickerRoot}>{picker}</View>
        </ModalView>
    );
};

OptionsPickerModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pickerProps: PropTypes.object,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.any.isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
    ),
    onSave: PropTypes.func.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.array,
    ]),
    title: PropTypes.string,
};

export const RangePickerModal = (props) => {
    const {
        open,
        onClose,
        startOptions = [],
        endOptions = [],
        onSave,
        title=' ',
    } = props;
    const {t} = useTranslation('app');
    const [range, setRange] = useState(
        props.range || {
            start: null,
            end: null,
        },
    );
    useEffect(() => {
        if (props.range) {
            setRange(props.range);
        }
    }, [props.range]);

    const onSave_ = () => {
        onSave(range);
    };

    const onClose_ = () => {
        setRange(
            props.range || {
                start: null,
                end: null,
            },
        );
        onClose();
    };
    return (
        <ModalView
            open={open}
            onClose={onClose_}
            onSave={onSave_}
            title={title}>
            <View style={styles.rangePickerRoot}>
                <Picker
                    selectedValue={range.start}
                    style={{flex: 1}}
                    onValueChange={(itemValue, itemIndex) => {
                        const modify = {
                            start: range.start,
                            end: range.end,
                        };
                        if (
                            itemValue !== null &&
                            range.end !== null &&
                            itemValue > range.end
                        ) {
                            modify.end = itemValue;
                        }
                        modify.start = itemValue;
                        setRange(modify);
                    }}>
                    {startOptions.map((item) => (
                        <Picker.Item
                            label={`${item.label}`}
                            value={item.value}
                            key={item.label}
                        />
                    ))}
                </Picker>
                <Text style={styles.toText}>{t('rangeTo')}</Text>
                <Picker
                    selectedValue={range.end}
                    style={{flex: 1}}
                    onValueChange={(itemValue, itemIndex) => {
                        const modify = {
                            start: range.start,
                            end: range.end,
                        };
                        if (
                            itemValue !== null &&
                            range.start !== null &&
                            itemValue < range.start
                        ) {
                            modify.start = itemValue;
                        }
                        modify.end = itemValue;
                        setRange(modify);
                    }}>
                    {endOptions.map((item) => (
                        <Picker.Item
                            label={`${item.label}`}
                            value={item.value}
                            key={item.label}
                        />
                    ))}
                </Picker>
            </View>
        </ModalView>
    );
};

RangePickerModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    startOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.any.isRequired,
            value: PropTypes.number,
        }),
    ),
    endOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.any.isRequired,
            value: PropTypes.number,
        }),
    ),
    onSave: PropTypes.func.isRequired,
    range: PropTypes.shape({
        start: PropTypes.number,
        end: PropTypes.number,
    }),
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    vCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    optionPickerRoot: {
        flex: 1,
    },
    rangePickerRoot: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toText: {
        fontSize: 22,
        fontWeight: '400',
        paddingHorizontal: 16,
    },
    optionLineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: 14,
        height: 35,
        paddingHorizontal: 12,
    },
    optionLineItemLabel: {
        fontSize: 18,
        // fontWeight:'500'
    },
});
