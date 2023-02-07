import React from 'react'
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'

interface Props {
  columns: string[]
  data: object[]
}

const DataTable: React.FC<Props> = ({ columns, data }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {columns.map(column => (
            <Th key={column}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map(column => (
              <Td key={`${index}-${column}`}>{(row as any)[column]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default DataTable
