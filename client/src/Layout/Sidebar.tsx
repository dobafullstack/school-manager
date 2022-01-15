import { Box } from '@chakra-ui/react';
import React from 'react';
import DropdownItem from '../components/Common/DropdownItem';
import SideItem from '../components/Common/SideItem';
import {
    AiOutlineHome,
    AiTwotoneBank,
    AiOutlineRadarChart,
    AiOutlineUserSwitch,
    AiOutlineUsergroupAdd,
} from 'react-icons/ai';

export default function Sidebar() {
    return (
        <Box minW="400px" shadow="lg" pt={5} px={3}>
            <SideItem label="Dashboard" path="/app/dashboard" icon={AiOutlineHome} />
            <SideItem label="School" path="/app/school" icon={AiTwotoneBank} />
            <SideItem label="Class" path="/app/class" icon={AiOutlineRadarChart} />
            <SideItem label="Teachers" path="/app/teacher" icon={AiOutlineUserSwitch} />
            <SideItem label="Student" path="/app/student" icon={AiOutlineUsergroupAdd} />
        </Box>
    );
}
