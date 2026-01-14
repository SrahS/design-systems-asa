import { transactionTypes } from "@/types";

export const transactionsJSON = [
  {
    "id": 1,
    "name": "Depósito via PIX",
    "date": "2026-01-10T09:15:00-03:00",
    "reference": "PIX-8F3A1C9D",
    "amount": 3500.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX (Banco Inter)"
  },
  {
    "id": 2,
    "name": "Transferência para João Silva",
    "date": "2026-01-10T14:22:10-03:00",
    "reference": "TED-20260110-1422",
    "amount": -420.75,
    "type": "Transferência",
    "description": "Pagamento de serviços"
  },
  {
    "id": 3,
    "name": "Saque em caixa 24h",
    "date": "2026-01-11T08:05:33-03:00",
    "reference": "ATM-2401-884512",
    "amount": -200.0,
    "type": "Saque",
    "description": "Tarifa inclusa"
  },
  {
    "id": 4,
    "name": "Depósito em dinheiro",
    "date": "2026-01-11T12:40:00-03:00",
    "reference": "CASH-DEP-771204",
    "amount": 150.0,
    "type": "Deposito"
  },
  {
    "id": 5,
    "name": "Transferência entre contas",
    "date": "2026-01-11T18:12:45-03:00",
    "reference": "INT-TRF-113820",
    "amount": -1000.0,
    "type": "Transferência",
    "description": "Transferência para conta poupança"
  },
  {
    "id": 6,
    "name": "Depósito de estorno",
    "date": "2026-01-12T07:55:05-03:00",
    "reference": "REV-CHG-009182",
    "amount": 89.9,
    "type": "Deposito",
    "description": "Estorno de compra (iFood)"
  },
  {
    "id": 7,
    "name": "Saque emergencial",
    "date": "2026-01-12T09:02:19-03:00",
    "reference": "ATM-EMR-220914",
    "amount": -50.0,
    "type": "Saque"
  },
  {
    "id": 8,
    "name": "Depósito via PIX",
    "date": "2026-01-12T10:15:00-03:00",
    "reference": "PIX-20260112-0010",
    "amount": 320.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 9,
    "name": "Transferência enviada",
    "date": "2026-01-12T11:08:12-03:00",
    "reference": "TRF-20260112-0009",
    "amount": -75.5,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 10,
    "name": "Saque em caixa 24h",
    "date": "2026-01-12T12:21:30-03:00",
    "reference": "ATM-20260112-0010",
    "amount": -120.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 11,
    "name": "Depósito em dinheiro",
    "date": "2026-01-12T13:05:18-03:00",
    "reference": "DEP-20260112-0011",
    "amount": 200.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 12,
    "name": "Transferência entre contas",
    "date": "2026-01-12T14:33:44-03:00",
    "reference": "TRF-20260112-0012",
    "amount": -240.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 13,
    "name": "Saque autorizado",
    "date": "2026-01-12T15:47:05-03:00",
    "reference": "ATM-20260112-0013",
    "amount": -60.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 14,
    "name": "Depósito de estorno",
    "date": "2026-01-12T16:12:59-03:00",
    "reference": "REV-20260112-0014",
    "amount": 45.9,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 15,
    "name": "Transferência recebida",
    "date": "2026-01-13T08:02:11-03:00",
    "reference": "TRF-20260113-0015",
    "amount": 180.0,
    "type": "Deposito",
    "description": "Crédito recebido"
  },
  {
    "id": 16,
    "name": "Transferência enviada",
    "date": "2026-01-13T09:19:42-03:00",
    "reference": "TRF-20260113-0016",
    "amount": -95.25,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 17,
    "name": "Saque emergencial",
    "date": "2026-01-13T10:27:03-03:00",
    "reference": "ATM-20260113-0017",
    "amount": -80.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 18,
    "name": "Depósito via PIX",
    "date": "2026-01-13T11:40:00-03:00",
    "reference": "PIX-20260113-0018",
    "amount": 510.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 19,
    "name": "Transferência entre contas",
    "date": "2026-01-13T12:55:27-03:00",
    "reference": "TRF-20260113-0019",
    "amount": -300.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 20,
    "name": "Saque em caixa 24h",
    "date": "2026-01-13T14:10:10-03:00",
    "reference": "ATM-20260113-0020",
    "amount": -150.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 21,
    "name": "Depósito em dinheiro",
    "date": "2026-01-13T15:05:55-03:00",
    "reference": "DEP-20260113-0021",
    "amount": 120.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 22,
    "name": "Transferência enviada",
    "date": "2026-01-14T08:12:34-03:00",
    "reference": "TRF-20260114-0022",
    "amount": -60.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 23,
    "name": "Saque autorizado",
    "date": "2026-01-14T09:26:41-03:00",
    "reference": "ATM-20260114-0023",
    "amount": -90.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 24,
    "name": "Depósito de estorno",
    "date": "2026-01-14T10:45:00-03:00",
    "reference": "REV-20260114-0024",
    "amount": 35.0,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 25,
    "name": "Depósito via PIX",
    "date": "2026-01-14T11:58:09-03:00",
    "reference": "PIX-20260114-0025",
    "amount": 780.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 26,
    "name": "Transferência entre contas",
    "date": "2026-01-14T13:07:22-03:00",
    "reference": "TRF-20260114-0026",
    "amount": -410.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 27,
    "name": "Saque em caixa 24h",
    "date": "2026-01-14T14:18:30-03:00",
    "reference": "ATM-20260114-0027",
    "amount": -70.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 28,
    "name": "Depósito em dinheiro",
    "date": "2026-01-14T15:33:00-03:00",
    "reference": "DEP-20260114-0028",
    "amount": 95.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 29,
    "name": "Transferência enviada",
    "date": "2026-01-15T08:05:19-03:00",
    "reference": "TRF-20260115-0029",
    "amount": -110.75,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 30,
    "name": "Saque emergencial",
    "date": "2026-01-15T09:21:48-03:00",
    "reference": "ATM-20260115-0030",
    "amount": -40.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 31,
    "name": "Depósito via PIX",
    "date": "2026-01-15T10:39:00-03:00",
    "reference": "PIX-20260115-0031",
    "amount": 260.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 32,
    "name": "Transferência entre contas",
    "date": "2026-01-15T11:44:33-03:00",
    "reference": "TRF-20260115-0032",
    "amount": -220.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 33,
    "name": "Saque autorizado",
    "date": "2026-01-15T13:02:10-03:00",
    "reference": "ATM-20260115-0033",
    "amount": -55.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 34,
    "name": "Depósito de estorno",
    "date": "2026-01-15T14:16:00-03:00",
    "reference": "REV-20260115-0034",
    "amount": 22.9,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 35,
    "name": "Depósito em dinheiro",
    "date": "2026-01-15T15:29:45-03:00",
    "reference": "DEP-20260115-0035",
    "amount": 130.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 36,
    "name": "Transferência enviada",
    "date": "2026-01-16T08:11:11-03:00",
    "reference": "TRF-20260116-0036",
    "amount": -85.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 37,
    "name": "Saque em caixa 24h",
    "date": "2026-01-16T09:24:26-03:00",
    "reference": "ATM-20260116-0037",
    "amount": -100.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 38,
    "name": "Depósito via PIX",
    "date": "2026-01-16T10:38:00-03:00",
    "reference": "PIX-20260116-0038",
    "amount": 640.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 39,
    "name": "Transferência entre contas",
    "date": "2026-01-16T11:52:40-03:00",
    "reference": "TRF-20260116-0039",
    "amount": -275.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 40,
    "name": "Saque emergencial",
    "date": "2026-01-16T13:06:03-03:00",
    "reference": "ATM-20260116-0040",
    "amount": -65.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 41,
    "name": "Depósito de estorno",
    "date": "2026-01-16T14:20:00-03:00",
    "reference": "REV-20260116-0041",
    "amount": 18.5,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 42,
    "name": "Transferência enviada",
    "date": "2026-01-17T08:03:39-03:00",
    "reference": "TRF-20260117-0042",
    "amount": -140.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 43,
    "name": "Saque autorizado",
    "date": "2026-01-17T09:18:12-03:00",
    "reference": "ATM-20260117-0043",
    "amount": -75.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 44,
    "name": "Depósito em dinheiro",
    "date": "2026-01-17T10:30:00-03:00",
    "reference": "DEP-20260117-0044",
    "amount": 210.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 45,
    "name": "Transferência entre contas",
    "date": "2026-01-17T11:44:55-03:00",
    "reference": "TRF-20260117-0045",
    "amount": -360.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 46,
    "name": "Saque em caixa 24h",
    "date": "2026-01-17T13:02:08-03:00",
    "reference": "ATM-20260117-0046",
    "amount": -95.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 47,
    "name": "Depósito via PIX",
    "date": "2026-01-17T14:18:00-03:00",
    "reference": "PIX-20260117-0047",
    "amount": 430.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 48,
    "name": "Transferência enviada",
    "date": "2026-01-18T08:09:17-03:00",
    "reference": "TRF-20260118-0048",
    "amount": -55.25,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 49,
    "name": "Saque emergencial",
    "date": "2026-01-18T09:21:02-03:00",
    "reference": "ATM-20260118-0049",
    "amount": -45.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 50,
    "name": "Depósito de estorno",
    "date": "2026-01-18T10:35:00-03:00",
    "reference": "REV-20260118-0050",
    "amount": 29.9,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 51,
    "name": "Depósito em dinheiro",
    "date": "2026-01-18T12:02:00-03:00",
    "reference": "DEP-20260118-0051",
    "amount": 160.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 52,
    "name": "Transferência entre contas",
    "date": "2026-01-18T13:18:41-03:00",
    "reference": "TRF-20260118-0052",
    "amount": -210.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 53,
    "name": "Saque em caixa 24h",
    "date": "2026-01-18T14:33:09-03:00",
    "reference": "ATM-20260118-0053",
    "amount": -80.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 54,
    "name": "Depósito via PIX",
    "date": "2026-01-19T08:10:00-03:00",
    "reference": "PIX-20260119-0054",
    "amount": 520.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 55,
    "name": "Transferência enviada",
    "date": "2026-01-19T09:24:26-03:00",
    "reference": "TRF-20260119-0055",
    "amount": -130.75,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 56,
    "name": "Saque emergencial",
    "date": "2026-01-19T10:36:58-03:00",
    "reference": "ATM-20260119-0056",
    "amount": -55.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 57,
    "name": "Depósito de estorno",
    "date": "2026-01-19T11:50:00-03:00",
    "reference": "REV-20260119-0057",
    "amount": 19.9,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 58,
    "name": "Transferência entre contas",
    "date": "2026-01-19T13:05:17-03:00",
    "reference": "TRF-20260119-0058",
    "amount": -280.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 59,
    "name": "Saque autorizado",
    "date": "2026-01-19T14:19:44-03:00",
    "reference": "ATM-20260119-0059",
    "amount": -70.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 60,
    "name": "Depósito em dinheiro",
    "date": "2026-01-19T15:33:00-03:00",
    "reference": "DEP-20260119-0060",
    "amount": 140.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 61,
    "name": "Depósito via PIX",
    "date": "2026-01-20T08:06:00-03:00",
    "reference": "PIX-20260120-0061",
    "amount": 310.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 62,
    "name": "Transferência enviada",
    "date": "2026-01-20T09:21:37-03:00",
    "reference": "TRF-20260120-0062",
    "amount": -95.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 63,
    "name": "Saque em caixa 24h",
    "date": "2026-01-20T10:34:12-03:00",
    "reference": "ATM-20260120-0063",
    "amount": -120.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 64,
    "name": "Depósito de estorno",
    "date": "2026-01-20T11:48:00-03:00",
    "reference": "REV-20260120-0064",
    "amount": 24.5,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 65,
    "name": "Transferência entre contas",
    "date": "2026-01-20T13:02:55-03:00",
    "reference": "TRF-20260120-0065",
    "amount": -340.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 66,
    "name": "Saque emergencial",
    "date": "2026-01-20T14:17:33-03:00",
    "reference": "ATM-20260120-0066",
    "amount": -60.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 67,
    "name": "Depósito em dinheiro",
    "date": "2026-01-20T15:28:00-03:00",
    "reference": "DEP-20260120-0067",
    "amount": 180.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 68,
    "name": "Transferência enviada",
    "date": "2026-01-21T08:14:09-03:00",
    "reference": "TRF-20260121-0068",
    "amount": -150.25,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 69,
    "name": "Saque autorizado",
    "date": "2026-01-21T09:27:41-03:00",
    "reference": "ATM-20260121-0069",
    "amount": -85.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 70,
    "name": "Depósito via PIX",
    "date": "2026-01-21T10:42:00-03:00",
    "reference": "PIX-20260121-0070",
    "amount": 760.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 71,
    "name": "Transferência entre contas",
    "date": "2026-01-21T11:58:26-03:00",
    "reference": "TRF-20260121-0071",
    "amount": -230.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 72,
    "name": "Saque em caixa 24h",
    "date": "2026-01-21T13:12:58-03:00",
    "reference": "ATM-20260121-0072",
    "amount": -110.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 73,
    "name": "Depósito de estorno",
    "date": "2026-01-21T14:26:00-03:00",
    "reference": "REV-20260121-0073",
    "amount": 32.0,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 74,
    "name": "Depósito em dinheiro",
    "date": "2026-01-21T15:39:00-03:00",
    "reference": "DEP-20260121-0074",
    "amount": 115.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 75,
    "name": "Transferência enviada",
    "date": "2026-01-22T08:05:33-03:00",
    "reference": "TRF-20260122-0075",
    "amount": -70.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 76,
    "name": "Saque emergencial",
    "date": "2026-01-22T09:18:04-03:00",
    "reference": "ATM-20260122-0076",
    "amount": -50.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 77,
    "name": "Depósito via PIX",
    "date": "2026-01-22T10:30:00-03:00",
    "reference": "PIX-20260122-0077",
    "amount": 280.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 78,
    "name": "Transferência entre contas",
    "date": "2026-01-22T11:45:19-03:00",
    "reference": "TRF-20260122-0078",
    "amount": -410.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 79,
    "name": "Saque autorizado",
    "date": "2026-01-22T13:01:42-03:00",
    "reference": "ATM-20260122-0079",
    "amount": -75.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 80,
    "name": "Depósito de estorno",
    "date": "2026-01-22T14:16:00-03:00",
    "reference": "REV-20260122-0080",
    "amount": 21.9,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 81,
    "name": "Depósito em dinheiro",
    "date": "2026-01-22T15:28:00-03:00",
    "reference": "DEP-20260122-0081",
    "amount": 190.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 82,
    "name": "Transferência enviada",
    "date": "2026-01-23T08:08:21-03:00",
    "reference": "TRF-20260123-0082",
    "amount": -120.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 83,
    "name": "Saque em caixa 24h",
    "date": "2026-01-23T09:22:45-03:00",
    "reference": "ATM-20260123-0083",
    "amount": -140.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 84,
    "name": "Depósito via PIX",
    "date": "2026-01-23T10:36:00-03:00",
    "reference": "PIX-20260123-0084",
    "amount": 610.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 85,
    "name": "Transferência entre contas",
    "date": "2026-01-23T11:50:28-03:00",
    "reference": "TRF-20260123-0085",
    "amount": -260.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 86,
    "name": "Saque emergencial",
    "date": "2026-01-23T13:04:10-03:00",
    "reference": "ATM-20260123-0086",
    "amount": -65.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 87,
    "name": "Depósito de estorno",
    "date": "2026-01-23T14:18:00-03:00",
    "reference": "REV-20260123-0087",
    "amount": 27.5,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 88,
    "name": "Depósito em dinheiro",
    "date": "2026-01-23T15:31:00-03:00",
    "reference": "DEP-20260123-0088",
    "amount": 155.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 89,
    "name": "Transferência enviada",
    "date": "2026-01-24T08:06:57-03:00",
    "reference": "TRF-20260124-0089",
    "amount": -90.0,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 90,
    "name": "Saque autorizado",
    "date": "2026-01-24T09:19:30-03:00",
    "reference": "ATM-20260124-0090",
    "amount": -80.0,
    "type": "Saque",
    "description": "Saque realizado"
  },
  {
    "id": 91,
    "name": "Depósito via PIX",
    "date": "2026-01-24T10:33:00-03:00",
    "reference": "PIX-20260124-0091",
    "amount": 340.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 92,
    "name": "Transferência entre contas",
    "date": "2026-01-24T11:47:12-03:00",
    "reference": "TRF-20260124-0092",
    "amount": -310.0,
    "type": "Transferência",
    "description": "Transferência instantânea"
  },
  {
    "id": 93,
    "name": "Saque em caixa 24h",
    "date": "2026-01-24T13:01:44-03:00",
    "reference": "ATM-20260124-0093",
    "amount": -105.0,
    "type": "Saque",
    "description": "Terminal 24h"
  },
  {
    "id": 94,
    "name": "Depósito de estorno",
    "date": "2026-01-24T14:15:00-03:00",
    "reference": "REV-20260124-0094",
    "amount": 16.9,
    "type": "Deposito",
    "description": "Estorno processado"
  },
  {
    "id": 95,
    "name": "Depósito em dinheiro",
    "date": "2026-01-24T15:29:00-03:00",
    "reference": "DEP-20260124-0095",
    "amount": 205.0,
    "type": "Deposito",
    "description": "Depósito confirmado"
  },
  {
    "id": 96,
    "name": "Transferência enviada",
    "date": "2026-01-25T08:10:18-03:00",
    "reference": "TRF-20260125-0096",
    "amount": -65.25,
    "type": "Transferência",
    "description": "Pagamento"
  },
  {
    "id": 97,
    "name": "Saque emergencial",
    "date": "2026-01-25T09:23:50-03:00",
    "reference": "ATM-20260125-0097",
    "amount": -45.0,
    "type": "Saque",
    "description": "Caixa eletrônico"
  },
  {
    "id": 98,
    "name": "Depósito via PIX",
    "date": "2026-01-25T10:37:00-03:00",
    "reference": "PIX-20260125-0098",
    "amount": 890.0,
    "type": "Deposito",
    "description": "Crédito recebido via PIX"
  },
  {
    "id": 99,
    "name": "Transferência entre contas",
    "date": "2026-01-25T11:52:26-03:00",
    "reference": "TRF-20260125-0099",
    "amount": -480.0,
    "type": "Transferência",
    "description": "Transferência programada"
  },
  {
    "id": 100,
    "name": "Saque autorizado",
    "date": "2026-01-25T13:06:03-03:00",
    "reference": "ATM-20260125-0100",
    "amount": -90.0,
    "type": "Saque",
    "description": "Saque realizado"
  }
];