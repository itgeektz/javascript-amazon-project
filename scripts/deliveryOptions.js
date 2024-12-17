import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    deliveryOptionId: '1',
    days: 7,
    pricecents: 0,
},
{
    deliveryOptionId: '2',
    days: 3,
    pricecents: 499,
},
{
    deliveryOptionId: '3',
    days: 1,
    pricecents: 999,
}];

export function deliveryDatedisp(selected,selectedId){
    let selectedOption = deliveryOptions[selectedId-1];
    let deliveryDate = dayjs().add(selectedOption.days, 'day');
    let dateString = deliveryDate.format('dddd , D MMMM YYYY');
    return dateString
}