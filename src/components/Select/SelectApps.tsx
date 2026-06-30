import { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { Sessions } from "types/Session";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import { useAppQuery } from "@services/reactQuery/applications";
import { IApplication } from "types/apps";

export type SelectValueType = { label?: string, value?: string } | undefined;
const SelectApps = ({ 
    session, 
    onChange, 
    enabled = false, 
    selected 
}: { 
    session?: Sessions, 
    onChange?: (data: IApplication | undefined) => void, 
    enabled?: boolean, 
    selected?: SelectValueType 
}) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce<string>(search, 500);
    const [selectedValue, setSelectedValue] = useState<SelectValueType>();

    const QueryData = useAppQuery({
        pagination: { current: 1, pageSize: 10, total: 0 },
        session,
        enabled,
        search: debouncedSearch === "" ? selected?.value : debouncedSearch
    })

    const options = QueryData.data?.data?.data?.map((d) => {
        return {
            label: `${d?.app_name}`,
            value: `${d?.id}`
        }
    });
    useEffect(() => {
        setSelectedValue(selected);
    }, [selected])

    return (
        <>
            <Select
                options={options}
                style={{ width: "100%" }}
                // mode="multiple"
                labelInValue
                showSearch
                allowClear
                filterOption={false}
                notFoundContent={QueryData.isLoading ? <Spin size="small" /> : null}
                placeholder="Input App Name"
                value={selectedValue}
                onChange={(d: { label?: string; value?: string; }) => {
                    const data = QueryData.data?.data?.data?.find((e) => (e?.id)?.toString() === d?.value)
                    setSelectedValue(d);
                    if (onChange) onChange(data)
                }}
                onSearch={(text: string) => {
                    setSearch(text);
                }}
            />
        </>
    )
}
export default SelectApps;