import React from 'react'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextApp } from './TextApp';
import { StatusLife } from './StatusLife';
import { LifeTest } from '../../interfaces/interface.lifeTest';
import { useUpdateStatus } from '../../api/useLifeTest';


interface Props {
    id: string
    lifetest: LifeTest
}

export const CustomStatus = ({ lifetest, id }: Props) => {

    const { mutate } = useUpdateStatus()

    const handleStatus = async () => {
      mutate(id)
    };
    
    return (
        <Menu>
            <MenuTrigger>
                <StatusLife lifeTest={lifetest!} />
            </MenuTrigger>
            <MenuOptions customStyles={{
                optionsContainer: {
                    borderRadius: 10,
                    padding: 5,
                    marginTop: 30
                }, optionText: {
                    fontSize: 16,
                }
            }}
            >
                {
                    lifetest.status === false
                        ?
                        <MenuOption onSelect={handleStatus}
                            customStyles={{
                                optionWrapper: {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 6,
                                },
                            }}>
                            <Icon size={20} name="checkmark-circle-outline" />
                            <TextApp style={{ marginLeft: 10 }}>Mark as Done</TextApp>
                        </MenuOption>
                        :
                        <MenuOption onSelect={handleStatus}
                            customStyles={{
                                optionWrapper: {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 6,
                                },
                            }}>
                            <Icon size={20} name="arrow-back-circle-outline" />
                            <TextApp style={{ marginLeft: 10 }}>{
                                lifetest.test.length === 0
                                ? "Back to Pending"
                                : "Back to In process"
                            }</TextApp>
                        </MenuOption>
                }
            </MenuOptions>

        </Menu>
    )
}
