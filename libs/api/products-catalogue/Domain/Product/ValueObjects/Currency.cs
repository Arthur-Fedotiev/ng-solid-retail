using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class Currency : ValueObject
  {
    public CurrencyCode Code { get; private set; }
    public string Symbol { get; private set; }
    public static Currency USDollar => new(CurrencyCode.USD, "$");
    public static Currency CanadianDollar => new(CurrencyCode.CAD, "CDN$");
    public static Currency Euro => new(CurrencyCode.EUR, "€");

    public static Currency OfCode(CurrencyCode code)
    {
      return code switch
      {
        CurrencyCode.USD => new Currency(USDollar.Code, USDollar.Symbol),
        CurrencyCode.CAD => new Currency(CanadianDollar.Code, CanadianDollar.Symbol),
        CurrencyCode.EUR => new Currency(Euro.Code, Euro.Symbol),
        _ => throw new Exception($"Invalid code {code}")
      };
    }

#pragma warning disable CS8618
    private Currency()
    {
    }
#pragma warning restore CS8618

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Code;
      yield return Symbol;
    }

    private Currency(CurrencyCode code, string symbol)
    {
      if (string.IsNullOrWhiteSpace(symbol))
      {
        throw new Exception("Symbol cannot be null or whitespace.");
      }

      Code = code;
      Symbol = symbol;
    }
  }
}
