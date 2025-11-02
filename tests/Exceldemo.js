const ExcelJS = require('exceljs');

async function writeExcelTest(searchText,replaceText)
{
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile("/Users/shrutisrinivas/downloads/download.xlsx");
const worksheet =  workbook.getWorksheet('Sheet1');
const output =await readExcel(worksheet,searchText);
const cell = worksheet.getCell(output.row,output.col);
cell.value=replaceText;
await workbook.xlsx.writeFile("/Users/shrutisrinivas/downloads/download.xlsx");
}


async function readExcel(worksheet,searchText){
     let output= {row: -1, col: -1};
worksheet.eachRow((row,rowNumber) => 
    {
        row.eachCell((cell,colNumber)=>
                {
                    if (cell.value == searchText){
                        output = { row: rowNumber, col: colNumber };
                    }
                })
            })
         return output;   
}
writeExcelTest("Apple","iphone");