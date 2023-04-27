using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Sr.SolidRetailApi.Controllers
{
  public class ErrorsController : ControllerBase
  {
    private readonly ILogger<ErrorsController> _logger;

    public ErrorsController(ILogger<ErrorsController> logger)
    {
      _logger = logger;
    }

    [Route("/error")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public IActionResult Error()
    {
      var exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;

      return Problem(
        title: exception?.Message,
        statusCode: 500);
    }
  }
}
