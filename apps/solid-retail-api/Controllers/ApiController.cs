using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace Sr.SolidRetailApi.Controllers
{
  [ApiController]
  [Produces("application/json")]
  public class ApiController : ControllerBase
  {
    protected IActionResult Problem(List<IError> errors)
    {
      IError firstError = errors.First();

      var statusCode = firstError.Metadata.TryGetValue("StatusCode", out var statusCodeValue)
        ? (int)statusCodeValue
        : StatusCodes.Status500InternalServerError;

      return Problem(
        detail: firstError.Message,
        statusCode: statusCode);
    }
  }
}
