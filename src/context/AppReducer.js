export default (state, {
  payload, type
}) => {
    switch (type) {
      case "GET_WORK_CELL":
        return {
          ...state,
          workCellData: [...state.workCellData, payload]
        };
        case "GET_PANEL_SHOP":
        return {
          ...state,
          panelShop: [...state.panelShop, payload]
        };
        case "GET_KEY_DATA":
        return {
          ...state,
          keyData: [...state.keyData, payload]
        };
        case "GET_KEY_DATA_EMPTY":
          return {
            ...state,
            keyData: []
          };
        case "GET_WORK_ORDER":
        return {
          ...state,
          laborActivity: [...state.laborActivity, payload]
        };
        case "GET_LABOR_CONFIRM":
          return {
            ...state,
            laborConfirm: payload
          };
        
      default:
        return state;
    }
  };