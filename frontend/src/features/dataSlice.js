import { createSlice } from "@reduxjs/toolkit";
const date=new Date().getFullYear()-1;
console.log(date);
const initialState = {
    dataValue:[],
    balanceSheet:[],
    applications:[],
    preAsses:[],
    ViewBalance:[],
    table:[ {
        year:date,
        month:"January",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"February",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"March",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"April",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"May",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"June",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"July",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"August",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"September",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"October",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"November",
        profitOrLoss:0,
        assetsValue:0
    },
    {
        year:date,
        month:"December",
        profitOrLoss:0,
        assetsValue:0
    },]

};
export const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{
        dataRedux:(state,action)=>{
            console.log(action.payload);
            state.dataValue=[action.payload]
        },
        editRedux:(state,action)=>{
            console.log(action.payload);
            const index=state.table.findIndex((item)=>item.month===action.payload.month);
            console.log(index);
            state.table[index].profitOrLoss=action.payload.profitOrLoss;
            state.table[index].assetsValue=action.payload.assetsValue;
        },
        resetRedux:(state,action)=>{
          
            state.table.forEach((item)=>{
                item.profitOrLoss=0;
                item.assetsValue=0;
            })

        },
        balanceRedux:(state,action)=>{
           
            state.applications=action.payload;
            console.log(state.applications);
        },
        preAssesRedux:(state,action)=>{
            console.log(action.payload);
            state.preAsses=action.payload
        },
        ViewRedux:(state,action)=>{
            console.log(action.payload,"view redux");
            state.ViewBalance=action.payload;
        }
    }
});

export const {dataRedux,editRedux,resetRedux,balanceRedux,preAssesRedux,ViewRedux}=dataSlice.actions;
export default dataSlice.reducer;