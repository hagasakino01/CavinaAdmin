"use client";
import MenuPage from "@/components/menu/menu";
import { Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import axios from "axios";
import ModalEditProduct from "@/components/modal/ModalEditProduct/ModalEditProduct";

interface DataType {
  id: string;
  name: string;
  code: string;
  discountPrice: number;
  priceUsed: number;
  quantity: number;
}

export default function Voucher() {
  const router = useRouter();
  const storedToken = Cookies.get("accessToken");
  const [dataVoucher, setDataVoucher] = useState<any>([]);

  const handleVoucher = async () => {
    axios
      .get(`http://localhost:4000/v4/voucher/list/all`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(function (res) {
        // handle success
        console.log(res);
        const dataFill = res.data.vouchers.map((item: any) => {
          return {
            id: item._id,
            name: item.name,
            code: item.code,
            discountPrice: item.discountPrice,
            priceUsed: item.priceUsed,
            quantity: item.quantity,
          };
        });
        console.log(dataFill);
        setDataVoucher(dataFill);
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    if (!storedToken) {
      router.push("/Login");
    }

    handleVoucher();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Giá trị",
      dataIndex: "discountPrice",
      key: "discountPrice",
    },
    {
      title: "Đơn tối thiểu",
      dataIndex: "priceUsed",
      key: "priceUsed",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  return (
    <Box display="flex" flexDirection="row" bgcolor="#FFD4DE">
      <MenuPage />
      <Box>
        <Box
          px="80px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ fontWeight: 500, fontSize: "48px", color: "#000000" }}
            my="30px"
          >
            Danh sách Voucher
          </Typography>
        </Box>
        <Box
          px="80px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Table
            columns={columns}
            pagination={{ pageSize: 8 }}
            dataSource={dataVoucher}
          />
        </Box>
      </Box>
    </Box>
  );
}
