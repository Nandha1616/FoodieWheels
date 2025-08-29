import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { makeRequest } from "../../services/apiServices";
import { toast } from "react-hot-toast";
import { Card, Typography } from "@material-tailwind/react";
import useDialog from "../../hooks/useDialog";
import Delete from "../../components/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Vendors() {
  const navigate = useNavigate();
  const TABLE_HEAD = ["Name", "Phone", "Email", "Action"];

  const { isOpen, openDialog, closeDialog } = useDialog();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: users = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest(
        "/admin/all/users",
        "GET",
        null,
        {},
        userInfo?.token ? userInfo.token : ""
      ),
    onSuccess: () => {
      toast.success("All Users Received Successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
    select: (data) => data.users.filter((user) => user.role.includes("vendor"))
  });

  const renderedTableRows = useMemo(() => {
    if (users.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="text-center p-4">
            No users available.
          </td>
        </tr>
      );
    }

    return users.map(({ name, email, phone, _id }, index) => (
      <tr key={_id}>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {name}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {phone}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {email}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex gap-2">
            <button
              className="text-green-800 border border-green-800 p-2 rounded hover:bg-green-800 hover:text-white transition duration-200"
              onClick={() => navigate(`/update/${_id}`)}
            >
              <CreateIcon />
            </button>
            <button
              className="text-rose-500 border border-rose-500 p-2 rounded hover:bg-rose-500 hover:text-white transition duration-200"
              onClick={openDialog}
            >
              <RestoreFromTrashIcon />
            </button>
          </div>
        </td>
      </tr>
    ));
  }, [users, navigate, openDialog]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10">Failed to load users.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200"
          onClick={() => navigate("/sign-up")}
        >
          Add User <span className="text-xl">+</span>
        </button>
      </div>
      <Card className="overflow-auto border-2 rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderedTableRows}</tbody>
        </table>
      </Card>

      {isOpen && (
        <Delete userId={"selectedUserId"} event={closeDialog} open={isOpen}>
          <p>Are you sure you want to delete this user?</p>
        </Delete>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { IconField } from 'primereact/iconfield';
// import { InputIcon } from 'primereact/inputicon';
// import { MultiSelect } from 'primereact/multiselect';
// import { Dropdown } from 'primereact/dropdown';
// import { Tag } from 'primereact/tag';
// import { CustomerService } from './service/CustomerService';

// export default function BasicDemo() {
//     const [customers, setCustomers] = useState(null);
//     const [filters, setFilters] = useState({
//         global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//         name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//         'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//         representative: { value: null, matchMode: FilterMatchMode.IN },
//         status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
//     });

//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const representatives = [
//         { name: 'Amy Elsner', image: 'amyelsner.png' },
//         { name: 'Anna Fali', image: 'annafali.png' },
//         { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
//         { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
//         { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
//         { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
//         { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
//         { name: 'Onyama Limba', image: 'onyamalimba.png' },
//         { name: 'Stephen Shaw', image: 'stephenshaw.png' },
//         { name: 'XuXue Feng', image: 'xuxuefeng.png' }
//     ];
//     const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal'];

//     const getSeverity = (status) => {
//         switch (status) {
//             case 'unqualified':
//                 return 'danger';

//             case 'qualified':
//                 return 'success';

//             case 'new':
//                 return 'info';

//             case 'negotiation':
//                 return 'warning';

//             case 'renewal':
//                 return null;
//         }
//     };

//     useEffect(() => {
//         CustomerService.getCustomersSmall().then((data) => setCustomers(data));
//     }, []);

//     const countryBodyTemplate = (rowData) => {
//         return (
//             <div className="flex align-items-center gap-2">
//                 <img alt={rowData.country.code} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
//                 <span>{rowData.country.name}</span>
//             </div>
//         );
//     };

//     const representativeBodyTemplate = (rowData) => {
//         const representative = rowData.representative;

//         return (
//             <div className="flex align-items-center gap-2">
//                 <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
//                 <span>{representative.name}</span>
//             </div>
//         );
//     };

//     const representativeFilterTemplate = (options) => {
//         return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
//     };

//     const representativesItemTemplate = (option) => {
//         return (
//             <div className="flex align-items-center gap-2">
//                 <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
//                 <span>{option.name}</span>
//             </div>
//         );
//     };

//     const statusBodyTemplate = (rowData) => {
//         return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
//     };

//     const statusFilterTemplate = (options) => {
//         return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
//     };

//     const statusItemTemplate = (option) => {
//         return <Tag value={option} severity={getSeverity(option)} />;
//     };

//     const onGlobalFilterChange = (event) => {
//         const value = event.target.value;
//         let _filters = { ...filters };

//         _filters['global'].value = value;

//         setFilters(_filters);
//     };

//     const renderHeader = () => {
//         const value = filters['global'] ? filters['global'].value : '';

//         return (
//             <IconField iconPosition="left">
//                 <InputIcon className="pi pi-search" />
//                 <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Global Search" />
//             </IconField>
//         );
//     };

//     const header = renderHeader();

//     return (
//         <div className="card">
//             <DataTable value={customers} paginator rows={5} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
//                     selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
//                     stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="No customers found." tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="name" header="Name" sortable filter filterPlaceholder="Search" style={{ width: '25%' }}></Column>
//                 <Column header="Country" body={countryBodyTemplate} sortable sortField="country.name" filter filterField="country.name" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
//                 <Column header="Agent" body={representativeBodyTemplate} sortable sortField="representative.name" filter filterField="representative"
//                     showFilterMatchModes={false} filterElement={representativeFilterTemplate} filterMenuStyle={{ width: '14rem' }} style={{ width: '25%' }} ></Column>
//                 <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} filterMenuStyle={{ width: '14rem' }} style={{ width: '25%' }}></Column>
//             </DataTable>
//         </div>
//     );
// }
