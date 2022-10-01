function MostrarInicio()
{
    console.log('a');
    $('#PanelInicio').show();
    $('#PanelConsultas').hide();
    $('#PanelAcercaDe').hide();
    $('#PanelCuenta').hide();

    $('#espacio1').show();
    $('#espacio2').show();
    $('#PanelConsultasBusqueda').hide();
}
function MostrarConsultas()
{
    $('#PanelInicio').hide();
    $('#PanelConsultas').show();
    $('#PanelAcercaDe').hide();
    $('#PanelCuenta').hide();
    
    $('#espacio1').hide();
    $('#espacio2').hide();
    $('#PanelConsultasBusqueda').show();
}
function MostrarAcercaDe()
{
    $('#PanelInicio').hide();
    $('#PanelConsultas').hide();
    $('#PanelAcercaDe').show();
    $('#PanelCuenta').hide();
    
    $('#espacio1').show();
    $('#espacio2').show();
    $('#PanelConsultasBusqueda').hide();
}
function MostrarCuenta()
{
    $('#PanelInicio').hide();
    $('#PanelConsultas').hide();
    $('#PanelAcercaDe').hide();
    $('#PanelCuenta').show();
    
    $('#espacio1').show();
    $('#espacio2').show();
    $('#PanelConsultasBusqueda').hide();
}